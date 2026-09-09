<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

import { Reservation } from './entities/reservation.entity';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      User,
      Book,
    ]),
  ],

  controllers: [
    ReservationsController,
  ],

  providers: [
    ReservationsService,
  ],
})
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

import { Reservation } from './entities/reservation.entity';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      User,
      Book,
    ]),
  ],

  controllers: [
    ReservationsController,
  ],

  providers: [
    ReservationsService,
  ],
})
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class ReservationsModule {}