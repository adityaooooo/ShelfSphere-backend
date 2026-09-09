import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
type PublicUser = {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    staffId: string | null;
    role: UserRole;
};
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(body: RegisterDto): Promise<{
        message: string;
        user: PublicUser;
    }>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    private toPublicUser;
}
export {};
