import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/services/email.service';
import { SignUpDto, SignInDto } from '../../common/dto/auth.dto';
import { UserRole } from '@prisma/client';

// Type for user selection that includes whitelisted and profileImageUrl
type UserSelectResult = {
  id: string;
  email: string;
  username: string;
  password?: string | null;
  whitelisted?: boolean;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string | null;
  address: string | null;
  profileImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const OTP_EXPIRY_MINUTES = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, email, username, ...rest } = signUpDto;

    // Check if email is whitelisted
    const whitelistedUser = (await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        whitelisted: true,
        role: true,
      } as any, // Type assertion needed due to Prisma type generation issue
    })) as UserSelectResult | null;

    if (!whitelistedUser || !whitelistedUser.whitelisted) {
      throw new UnauthorizedException('Email is not whitelisted. Please contact administrator.');
    }

    // Check if account already exists (has password)
    if (whitelistedUser.password) {
      throw new ConflictException('User account already exists. Please sign in instead.');
    }

    // Validate username format (should already be validated by DTO, but double-check)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new ConflictException('Username can only contain letters, numbers, and underscores. No spaces or special characters allowed.');
    }

    // Check if username is already taken by another user
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== whitelistedUser.id) {
      throw new ConflictException('Username is already taken. Please choose a different username.');
    }

    // If whitelisted user already has a username, allow user to change it during signup
    // The username from the DTO will be used (user's choice)

    // Hash password
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update whitelisted user with password and other details
    const user = (await this.prisma.user.update({
      where: { email },
      data: {
        ...rest,
        username,
        password: hashedPassword,
        role: rest.role || whitelistedUser!.role || UserRole.TECHNICIAN,
        whitelisted: true, // Ensure it stays whitelisted
      } as any, // Type assertion needed due to Prisma type generation issue
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      } as any, // Type assertion needed due to Prisma type generation issue
    })) as unknown as UserSelectResult;

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    // Try to find user by username or email
    let user = (await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        whitelisted: true,
        role: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      } as any, // Type assertion needed due to Prisma type generation issue
    })) as UserSelectResult | null;

    // If not found by username, try email
    if (!user) {
      user = (await this.prisma.user.findUnique({
        where: { email: username }, // username field might contain email
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
          whitelisted: true,
          role: true,
          firstName: true,
          lastName: true,
          phone: true,
          address: true,
          profileImageUrl: true,
          createdAt: true,
          updatedAt: true,
        } as any, // Type assertion needed due to Prisma type generation issue
      })) as UserSelectResult | null;
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if email is whitelisted
    if (!user.whitelisted) {
      throw new UnauthorizedException('Your account is not authorized. Please contact administrator.');
    }

    // Check if user has a password (account must be set up via signup)
    if (!user.password) {
      throw new UnauthorizedException('Account not set up. Please complete signup first.');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async updateProfileImage(userId: string, profileImageUrl: string): Promise<UserSelectResult> {
    const result = await this.prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl } as any, // Type assertion needed due to Prisma type generation issue
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      } as any, // Type assertion needed due to Prisma type generation issue
    });
    return result as unknown as UserSelectResult;
  }

  private async generateTokens(userId: string, role: UserRole) {
    const payload = { sub: userId, role };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!jwtSecret || !jwtRefreshSecret) {
      throw new Error('JWT secrets are not configured');
    }

    const accessTokenExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '7d');
    const refreshTokenExpiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '30d');

    const accessTokenOptions: JwtSignOptions = {
      secret: jwtSecret,
      expiresIn: accessTokenExpiresIn as StringValue,
    };

    const refreshTokenOptions: JwtSignOptions = {
      secret: jwtRefreshSecret,
      expiresIn: refreshTokenExpiresIn as StringValue,
    };

    const accessToken = this.jwtService.sign(payload, accessTokenOptions);
    const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(userId: string) {
    const user = (await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      } as any, // Type assertion needed due to Prisma type generation issue
    })) as UserSelectResult | null;

    return user;
  }

  async refreshToken(refreshToken: string) {
    try {
      const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
      if (!jwtRefreshSecret) {
        throw new Error('JWT refresh secret is not configured');
      }

      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtRefreshSecret,
      });

      // Generate new tokens
      return this.generateTokens(payload.sub, payload.role);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async updateProfile(userId: string, dto: any) {
    const updateData: any = {};
    if (dto.firstName !== undefined) updateData.firstName = dto.firstName;
    if (dto.lastName !== undefined) updateData.lastName = dto.lastName;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.address !== undefined) updateData.address = dto.address;

    const result = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      } as any,
    });

    return result as unknown as UserSelectResult;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      message: 'Password changed successfully',
    };
  }

  /**
   * Request password reset - sends OTP to manager or technician email.
   * Only MANAGER and TECHNICIAN roles can use forgot password.
   */
  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists or not (security best practice)
    if (!user) {
      return {
        message: 'If the email exists, a password reset OTP has been sent',
      };
    }

    // Only manager and technician can use forgot password
    if (user.role !== UserRole.MANAGER && user.role !== UserRole.TECHNICIAN) {
      return {
        message: 'If the email exists, a password reset OTP has been sent',
      };
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

    // Invalidate any existing OTPs for this email
    await this.prisma.passwordResetOtp.deleteMany({
      where: { email },
    });

    // Store OTP
    await this.prisma.passwordResetOtp.create({
      data: { email, otp, expiresAt },
    });

    // Send OTP email
    await this.emailService.sendPasswordResetOtp(
      email,
      otp,
      user.firstName,
    );

    return {
      message: 'If the email exists, a password reset OTP has been sent',
    };
  }

  /**
   * Confirm password reset with OTP - for manager and technician.
   */
  async confirmPasswordReset(email: string, otp: string, newPassword: string) {
    const otpRecord = await this.prisma.passwordResetOtp.findFirst({
      where: { email, otp },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    if (new Date() > otpRecord.expiresAt) {
      await this.prisma.passwordResetOtp.delete({ where: { id: otpRecord.id } });
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    if (user.role !== UserRole.MANAGER && user.role !== UserRole.TECHNICIAN) {
      throw new BadRequestException('Password reset is not allowed for this account type');
    }

    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      }),
      this.prisma.passwordResetOtp.delete({ where: { id: otpRecord.id } }),
    ]);

    return {
      message: 'Password reset successfully',
    };
  }
}
