<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FinesController } from './fines.controller';
import { FinesService } from './fines.service';

import { Fine } from './entities/fine.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Fine,
      BorrowRecord,
    ]),
  ],

  controllers: [
    FinesController,
  ],

  providers: [
    FinesService,
  ],

  exports: [
    FinesService,
  ],
})
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FinesController } from './fines.controller';
import { FinesService } from './fines.service';

import { Fine } from './entities/fine.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Fine,
      BorrowRecord,
    ]),
  ],

  controllers: [
    FinesController,
  ],

  providers: [
    FinesService,
  ],

  exports: [
    FinesService,
  ],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class FinesModule {}