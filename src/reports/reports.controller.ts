<<<<<<< HEAD
import { Controller, Get } from '@nestjs/common';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('most-borrowed')
  mostBorrowedBooks() {
    return this.reportsService.mostBorrowedBooks();
  }

  @Get('overdue-books')
  overdueBooks() {
    return this.reportsService.overdueBooks();
  }

  @Get('top-members')
  topMembers() {
    return this.reportsService.topMembers();
  }

  @Get('fines')
  finesReport() {
    return this.reportsService.finesReport();
  }
=======
import { Controller, Get } from '@nestjs/common';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('most-borrowed')
  mostBorrowedBooks() {
    return this.reportsService.mostBorrowedBooks();
  }

  @Get('overdue-books')
  overdueBooks() {
    return this.reportsService.overdueBooks();
  }

  @Get('top-members')
  topMembers() {
    return this.reportsService.topMembers();
  }

  @Get('fines')
  finesReport() {
    return this.reportsService.finesReport();
  }
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}