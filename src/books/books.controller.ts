import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';

import { CreateBookDto } from './dto/create-book.dto';
import { BookQueryDto } from './dto/book-query.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/entities/user.entity';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  create(
    @Body()
    createBookDto: CreateBookDto,
  ) {
    return this.booksService.create(
      createBookDto,
    );
  }

  @Get()
  findAll(
    @Query()
    query: BookQueryDto,
  ) {
    return this.booksService.findAll(
      query,
    );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.booksService.findOne(
      Number(id),
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(UserRole.ADMIN)
  remove(
    @Param('id')
    id: string,
  ) {
    return this.booksService.remove(
      Number(id),
    );
  }
}