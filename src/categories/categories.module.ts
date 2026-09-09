<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
    ]),
  ],

  controllers: [
    CategoriesController,
  ],

  providers: [
    CategoriesService,
  ],

  exports: [
    CategoriesService,
  ],
})
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
    ]),
  ],

  controllers: [
    CategoriesController,
  ],

  providers: [
    CategoriesService,
  ],

  exports: [
    CategoriesService,
  ],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class CategoriesModule {}