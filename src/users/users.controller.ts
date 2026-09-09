<<<<<<< HEAD
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(
      Number(id),
    );
  }

  @Get(':id/history')
  async getMemberHistory(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      updateUserDto,
    );
  }
=======
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(
      Number(id),
    );
  }

  @Get(':id/history')
  async getMemberHistory(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      updateUserDto,
    );
  }
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}