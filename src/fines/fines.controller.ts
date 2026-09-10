import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { AuthenticatedRequest } from '../auth/types/auth.types';

import { UserRole } from '../users/entities/user.entity';

@Controller('fines')
export class FinesController {
  constructor(
    private readonly finesService: FinesService,
  ) {}

  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
  )
  create(
    @Body()
    body: CreateFineDto,

    @Request() req: AuthenticatedRequest,
  ) {
    return this.finesService.create(
      body,
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
    return this.finesService.findAll(
      req.user,
    );
  }

  @Patch(':id/pay')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles(
    UserRole.ADMIN,
    UserRole.LIBRARIAN,
  )
  payFine(
    @Param('id')
    id: string,

    @Request() req: AuthenticatedRequest,
  ) {
    return this.finesService.payFine(
      Number(id),
      req.user,
    );
  }
}
