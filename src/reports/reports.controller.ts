import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @Get('most-borrowed')
  mostBorrowedBooks() {
    return this.reportsService.mostBorrowedBooks();
  }

  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @Get('overdue-books')
  overdueBooks() {
    return this.reportsService.overdueBooks();
  }

  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @Get('top-members')
  topMembers() {
    return this.reportsService.topMembers();
  }

  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  @Get('fines')
  finesReport() {
    return this.reportsService.finesReport();
  }

}