import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto, SignInDto } from '../../common/dto/auth.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, email, username, ...rest } = signUpDto;

    // Check if email is whitelisted
    const whitelistedUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!whitelistedUser || !whitelistedUser.whitelisted) {
      throw new UnauthorizedException('Email is not whitelisted. Please contact administrator.');
    }

    // Check if account already exists (has password)
    if (whitelistedUser.password) {
      throw new ConflictException('User account already exists. Please sign in instead.');
    }

    // Check if username is already taken by another user
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== whitelistedUser.id) {
      throw new ConflictException('Username is already taken');
    }

    // Hash password
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update whitelisted user with password and other details
    const user = await this.prisma.user.update({
      where: { email },
      data: {
        ...rest,
        username,
        password: hashedPassword,
        role: rest.role || whitelistedUser.role || UserRole.TECHNICIAN,
        whitelisted: true, // Ensure it stays whitelisted
      },
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
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if email is whitelisted
    if (!user.whitelisted) {
      throw new UnauthorizedException('Your account is not authorized. Please contact administrator.');
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

  async updateProfileImage(userId: string, profileImageUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl },
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
      },
    });
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
    const user = await this.prisma.user.findUnique({
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
      },
    });

    return user;
  }
}
