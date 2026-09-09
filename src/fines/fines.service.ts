import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fine } from './entities/fine.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { CreateFineDto } from './dto/create-fine.dto';
import { UserRole } from '../users/entities/user.entity';
import type { AuthenticatedUser } from '../auth/types/auth.types';

@Injectable()
export class FinesService {
  constructor(
    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
  ) {}

  private toSafeFine(fine: Fine) {
    const { member, ...safeBorrowRecord } =
      fine.borrowRecord;

    return {
      ...fine,
      borrowRecord: safeBorrowRecord,
    };
  }

  async create(
    body: CreateFineDto,
    authenticatedUser: AuthenticatedUser,
  ) {
    if (authenticatedUser.role === UserRole.MEMBER) {
      throw new ForbiddenException(
        'Only library staff can create fines',
      );
    }

    const borrowRecord =
      await this.borrowRepository.findOne({
        where: {
          id: body.borrowRecordId,
        },
      });

    if (!borrowRecord) {
      throw new NotFoundException(
        'Borrow record not found',
      );
    }

    const fine =
      this.fineRepository.create({
        amount: body.amount,
        borrowRecord,
      });

    return this.fineRepository.save(
      fine,
    );
  }

  async findAll(
    authenticatedUser: AuthenticatedUser,
  ) {
    const fines = await this.fineRepository.find({
      where:
        authenticatedUser.role === UserRole.MEMBER
          ? {
              borrowRecord: {
                member: {
                  id: authenticatedUser.id,
                },
              },
            }
          : {},
      relations: {
        borrowRecord: {
          member: true,
        },
      },
    });

    return fines.map((fine) => this.toSafeFine(fine));
  }

  async payFine(
    id: number,
    authenticatedUser: AuthenticatedUser,
  ) {
    const fine =
      await this.fineRepository.findOne({
        where: { id },
        relations: {
          borrowRecord: {
            member: true,
          },
        },
      });

    if (!fine) {
      throw new NotFoundException(
        'Fine not found',
      );
    }

    if (authenticatedUser.role === UserRole.MEMBER) {
      throw new ForbiddenException(
        'Only library staff can mark fines as paid',
      );
    }

    fine.paid = true;

    const savedFine = await this.fineRepository.save(
      fine,
    );

    return this.toSafeFine(savedFine);
  }
}
