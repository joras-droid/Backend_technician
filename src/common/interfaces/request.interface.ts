import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone?: string;
    address?: string;
    profileImageUrl?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
