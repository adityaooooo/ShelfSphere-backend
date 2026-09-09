<<<<<<< HEAD
import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('member')
  @UseGuards(JwtAuthGuard)
  getMemberDashboard(@Req() req: any) {
    return this.dashboardService.getMemberDashboard(
      req.user.id,
    );
  }
=======
import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('member')
  @UseGuards(JwtAuthGuard)
  getMemberDashboard(@Req() req: any) {
    return this.dashboardService.getMemberDashboard(
      req.user.id,
    );
  }
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}