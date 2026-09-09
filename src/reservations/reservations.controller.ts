import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';

import { CreateReservationDto } from './dto/create-reservation.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { AuthenticatedRequest } from '../auth/types/auth.types';

import { UserRole } from '../users/entities/user.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService:
      ReservationsService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  create(
    @Body()
    createReservationDto:
      CreateReservationDto,

    @Request() req: AuthenticatedRequest,
  ) {
    return this.reservationsService.create(
      createReservationDto,
      req.user,
    );
  }

  @Get()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  findAll(
    @Request() req: AuthenticatedRequest,
  ) {
    return this.reservationsService.findAll(
      req.user,
    );
  }

  @Get(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  findOne(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.reservationsService.findOne(
      Number(id),
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
    UserRole.MEMBER,
  )
  remove(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.reservationsService.remove(
      Number(id),
      req.user,
    );
  }
}
