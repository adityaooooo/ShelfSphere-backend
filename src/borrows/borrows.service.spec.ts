<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsService } from './borrows.service';

describe('BorrowsService', () => {
  let service: BorrowsService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [BorrowsService],
      }).compile();

    service =
      module.get<BorrowsService>(
        BorrowsService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
=======
import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsService } from './borrows.service';

describe('BorrowsService', () => {
  let service: BorrowsService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [BorrowsService],
      }).compile();

    service =
      module.get<BorrowsService>(
        BorrowsService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
});