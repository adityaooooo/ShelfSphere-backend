import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  BorrowRecord,
  BorrowStatus,
} from '../borrows/entities/borrow-record.entity';

import { Fine } from '../fines/entities/fine.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRepository:
      Repository<BorrowRecord>,

    @InjectRepository(Fine)
    private readonly fineRepository:
      Repository<Fine>,
  ) {}

  async mostBorrowedBooks() {
    return this.borrowRepository
      .createQueryBuilder('borrow')

      .leftJoin(
        'borrow.book',
        'book',
      )

      .select(
        'book.title',
        'title',
      )

      .addSelect(
        'COUNT(book.id)',
        'borrowCount',
      )

      .groupBy(
        'book.title',
      )

      .orderBy(
        'COUNT(book.id)',
        'DESC',
      )

      .limit(10)

      .getRawMany();
  }

  async overdueBooks() {
    return this.borrowRepository.find({
      where: {
        status:
          BorrowStatus.BORROWED,
      },

      relations: {
        book: true,
        member: true,
      },
    }).then((records) =>
      records.filter(
        (record) =>
          new Date(
            record.dueDate,
          ) < new Date(),
      ),
    );
  }

  async topMembers() {
    return this.borrowRepository
      .createQueryBuilder('borrow')

      .leftJoin(
        'borrow.member',
        'member',
      )

      .select(
        'member.fullName',
        'member',
      )

      .addSelect(
        'COUNT(member.id)',
        'borrowCount',
      )

      .groupBy(
        'member.fullName',
      )

      .orderBy(
        'COUNT(member.id)',
        'DESC',
      )

      .limit(10)

      .getRawMany();
  }

  async finesReport() {
    const fines =
      await this.fineRepository.find();

    const totalFines =
      fines.reduce(
        (sum, fine) =>
          sum +
          Number(
            fine.amount,
          ),
        0,
      );

    const paidFines =
      fines
        .filter(
          (fine) =>
            fine.paid,
        )
        .reduce(
          (sum, fine) =>
            sum +
            Number(
              fine.amount,
            ),
          0,
        );

    const unpaidFines =
      totalFines -
      paidFines;

    return {
      totalFines,
      paidFines,
      unpaidFines,
    };
  }
}