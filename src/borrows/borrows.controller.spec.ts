<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsController } from './borrows.controller';

describe('BorrowsController', () => {
  let controller: BorrowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowsController],
    }).compile();

    controller = module.get<BorrowsController>(BorrowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
=======
import { Test, TestingModule } from '@nestjs/testing';
import { BorrowsController } from './borrows.controller';

describe('BorrowsController', () => {
  let controller: BorrowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowsController],
    }).compile();

    controller = module.get<BorrowsController>(BorrowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
