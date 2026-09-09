<<<<<<< HEAD
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';

@Controller('fines')
export class FinesController {
  constructor(
    private readonly finesService: FinesService,
  ) {}

  @Post()
  create(
    @Body()
    body: CreateFineDto,
  ) {
    return this.finesService.create(
      body,
    );
  }

  @Get()
  findAll() {
    return this.finesService.findAll();
  }

  @Patch(':id/pay')
  payFine(
    @Param('id')
    id: string,
  ) {
    return this.finesService.payFine(
      Number(id),
    );
  }
=======
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';

@Controller('fines')
export class FinesController {
  constructor(
    private readonly finesService: FinesService,
  ) {}

  @Post()
  create(
    @Body()
    body: CreateFineDto,
  ) {
    return this.finesService.create(
      body,
    );
  }

  @Get()
  findAll() {
    return this.finesService.findAll();
  }

  @Patch(':id/pay')
  payFine(
    @Param('id')
    id: string,
  ) {
    return this.finesService.payFine(
      Number(id),
    );
  }
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}