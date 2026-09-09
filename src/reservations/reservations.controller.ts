<<<<<<< HEAD
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';

import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService:
      ReservationsService,
  ) {}

  @Post()
  create(
    @Body()
    createReservationDto:
      CreateReservationDto,
  ) {
    return this.reservationsService.create(
      createReservationDto,
    );
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.reservationsService.remove(
      Number(id),
    );
  }
=======
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';

import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService:
      ReservationsService,
  ) {}

  @Post()
  create(
    @Body()
    createReservationDto:
      CreateReservationDto,
  ) {
    return this.reservationsService.create(
      createReservationDto,
    );
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.reservationsService.remove(
      Number(id),
    );
  }
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}