import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { AuthenticatedRequest, AuthenticatedUser } from './types/auth.types';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getRoot(): {
        message: string;
    };
    test(): {
        message: string;
    };
    adminOnly(): {
        message: string;
    };
    getProfile(req: AuthenticatedRequest): AuthenticatedUser;
    getProfilePost(req: AuthenticatedRequest): AuthenticatedUser;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            fullName: string;
            email: string;
            phone: string | null;
            staffId: string | null;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
