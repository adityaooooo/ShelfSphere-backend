<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BorrowRecord,
      Fine,
    ]),
  ],

  controllers: [
    ReportsController,
  ],

  providers: [
    ReportsService,
  ],
})
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BorrowRecord,
      Fine,
    ]),
  ],

  controllers: [
    ReportsController,
  ],

  providers: [
    ReportsService,
  ],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class ReportsModule {}