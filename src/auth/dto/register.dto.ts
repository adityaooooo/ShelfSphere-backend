<<<<<<< HEAD
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.MEMBER;
}
=======
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.MEMBER;
}
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
