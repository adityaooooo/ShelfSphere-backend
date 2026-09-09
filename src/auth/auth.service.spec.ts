import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access token for valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('secret123', 10);

    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
      role: UserRole.MEMBER,
    });
    mockJwtService.sign.mockReturnValue('signed-token');

    await expect(
      service.login({
        email: 'test@example.com',
        password: 'secret123',
      }),
    ).resolves.toEqual({
      access_token: 'signed-token',
    });

    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 1,
      email: 'test@example.com',
      role: UserRole.MEMBER,
    });
  });

  it('should reject login when the email is not found', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({
        email: 'missing@example.com',
        password: 'secret123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should reject login when the password is wrong', async () => {
    const hashedPassword = await bcrypt.hash('secret123', 10);

    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
      role: UserRole.MEMBER,
    });

    await expect(
      service.login({
        email: 'test@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
