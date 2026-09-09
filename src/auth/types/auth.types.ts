<<<<<<< HEAD
import { UserRole } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
=======
import { UserRole } from '../../users/entities/user.entity';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
