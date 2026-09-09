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
export class ReportsModule {}