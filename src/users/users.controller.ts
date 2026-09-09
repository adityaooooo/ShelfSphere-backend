import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Body,
  ForbiddenException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { AuthenticatedRequest } from '../auth/types/auth.types';

import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.createByAdmin(
      createUserDto,
    );
  }

  @Get()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(id);

    if (
      req.user.role !== UserRole.ADMIN &&
      req.user.id !== userId
    ) {
      throw new ForbiddenException(
        'You can only view your own profile',
      );
    }

    return this.usersService.findOne(
      userId,
    );
  }

  @Patch(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  update(
    @Param('id') id: string,

    @Body()
    updateUserDto: UpdateUserDto,

    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(id);

    if (
      req.user.role !== UserRole.ADMIN &&
      req.user.id !== userId
    ) {
      throw new ForbiddenException(
        'You can only update your own profile',
      );
    }

    if (
      req.user.role !== UserRole.ADMIN &&
      updateUserDto.role !== undefined
    ) {
      throw new ForbiddenException(
        'You cannot change your role',
      );
    }

    return this.usersService.update(
      userId,
      updateUserDto,
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  remove(
    @Param('id') id: string,
  ) {
    return this.usersService.remove(
      Number(id),
    );
  }
}
