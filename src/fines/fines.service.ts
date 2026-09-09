import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fine } from './entities/fine.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { CreateFineDto } from './dto/create-fine.dto';

@Injectable()
export class FinesService {
  constructor(
    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,

    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
  ) {}

  async create(body: CreateFineDto) {
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

  async findAll() {
    return this.fineRepository.find({
      relations: {
        borrowRecord: true,
      },
    });
  }

  async payFine(id: number) {
    const fine =
      await this.fineRepository.findOne({
        where: { id },
      });

    if (!fine) {
      throw new NotFoundException(
        'Fine not found',
      );
    }

    fine.paid = true;

    return this.fineRepository.save(
      fine,
    );
  }
}