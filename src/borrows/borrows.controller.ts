import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { BorrowsService } from './borrows.service';

import { CreateBorrowDto } from './dto/create-borrow.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { AuthenticatedRequest } from '../auth/types/auth.types';

import { UserRole } from '../users/entities/user.entity';

@Controller('borrows')
export class BorrowsController {
  constructor(
    private readonly borrowsService: BorrowsService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  borrowBook(
    @Body()
    dto: CreateBorrowDto,

    @Request() req: AuthenticatedRequest,
  ) {
    return this.borrowsService.borrowBook(
      dto,
      req.user,
    );
  }

  @Patch(':id/return')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  returnBook(
    @Param('id')
    id: string,

    @Request() req: AuthenticatedRequest,
  ) {
    return this.borrowsService.returnBook(
      Number(id),
      req.user,
    );
  }

  @Get()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  findAll(
    @Request() req: AuthenticatedRequest,
  ) {
    return this.borrowsService.findAll(
      req.user,
    );
  }

  @Get('history')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  getHistory() {
    return this.borrowsService.getHistory();
  }
}
