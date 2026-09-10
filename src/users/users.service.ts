import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);

    return this.userRepository.save(user);
  }

  async createByAdmin(
    createUserDto: CreateUserDto,
  ) {
    const existingUser = await this.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return this.toSafeUser(savedUser);
  }

  private toSafeUser(user: User) {
    const { password, ...safeUser } = user;

    return safeUser;
  }
  
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },

      relations: {
        borrowRecords: true,
        reservations: true,
      },
    });

    return user ? this.toSafeUser(user) : null;
  }
  async update(
  id: number,
  updateUserDto: UpdateUserDto,
) {
  const user =
    await this.userRepository.findOne({
      where: { id },
    });

  if (!user) {
    throw new NotFoundException(
      'User not found',
    );
  }

  if (updateUserDto.password) {
    updateUserDto.password =
      await bcrypt.hash(
        updateUserDto.password,
        10,
      );
  }

  Object.assign(
    user,
    updateUserDto,
  );

  const savedUser = await this.userRepository.save(
    user,
  );

  return this.toSafeUser(savedUser);
}
  async findAll() {
    const users = await this.userRepository.find();

    return users.map((user) =>
      this.toSafeUser(user),
    );
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    await this.userRepository.delete(id);

    return {
      message: 'User deleted successfully',
    };
  }
}
