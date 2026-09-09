import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({
      message: 'User registered successfully',
      user: {
        id: 1,
        email: 'test@example.com',
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],

      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the current user profile from the post me route', () => {
    const req = {
      user: {
        id: 1,
        email: 'test@example.com',
        role: UserRole.MEMBER,
      },
    };

    expect(controller.getProfilePost(req)).toEqual(req.user);
  });
});
