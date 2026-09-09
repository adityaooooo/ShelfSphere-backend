import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/entities/user.entity';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './types/auth.types';

type PublicUser = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  //memberId: string | null;
  staffId: string | null;
  role: UserRole;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDto) {
    const existingUser =
      await this.usersService.findByEmail(
        body.email,
      );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10,
      );

    const user =
      await this.usersService.create({
        ...body,
        password: hashedPassword,
      });

    return {
      message:
        'User registered successfully',
      user: this.toPublicUser(user),
    };
  }

  async login(body: LoginDto) {
    const user =
      await this.usersService.findByEmail(
        body.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isMatch =
      await bcrypt.compare(
        body.password,
        user.password,
      );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token:
        this.jwtService.sign(payload),
    };
  }

  private toPublicUser(
    user: User,
  ): PublicUser {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    //  memberId: user.memberId,
      staffId: user.staffId,
      role: user.role,
    };
  }
}