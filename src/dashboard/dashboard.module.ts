import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Fine } from '../fines/entities/fine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Book,
      BorrowRecord,
      Reservation,
      Fine,
    ]),
  ],

  controllers: [
    DashboardController,
  ],

  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}
