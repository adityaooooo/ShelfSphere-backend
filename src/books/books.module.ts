<<<<<<< HEAD
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Category,
    ]),
    AuthModule,
  ],

  controllers: [
    BooksController,
  ],

  providers: [BooksService],
})
=======
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Category,
    ]),
    AuthModule,
  ],

  controllers: [
    BooksController,
  ],

  providers: [BooksService],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class BooksModule {}