<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Book,
      BorrowRecord,
      Fine,
      Reservation,
    ]),
  ],

  controllers: [
    DashboardController,
  ],

  providers: [
    DashboardService,
  ],
})
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Book,
      BorrowRecord,
      Fine,
      Reservation,
    ]),
  ],

  controllers: [
    DashboardController,
  ],

  providers: [
    DashboardService,
  ],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class DashboardModule {}