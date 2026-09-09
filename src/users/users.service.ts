import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

import { UpdateUserDto } from './dto/update-user.dto';

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
  
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  
  async findOne(id: number) {
  return this.userRepository.findOne({
    where: { id },

    relations: {
      borrowRecords: true,
      reservations: true,
    },
  });
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

  return this.userRepository.save(
    user,
  );
}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
