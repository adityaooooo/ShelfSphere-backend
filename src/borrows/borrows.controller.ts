import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BorrowsService } from './borrows.service';

import { CreateBorrowDto } from './dto/create-borrow.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

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
  ) {
    return this.borrowsService.borrowBook(
      dto,
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
  )
  returnBook(
    @Param('id')
    id: string,
  ) {
    return this.borrowsService.returnBook(
      Number(id),
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
  )
  findAll() {
    return this.borrowsService.findAll();
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