<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';

describe('ReservationsController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
=======
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';

describe('ReservationsController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
