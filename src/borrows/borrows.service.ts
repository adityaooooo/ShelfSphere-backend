
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MailService } from '../mail/mail.service';

import {
  BorrowRecord,
  BorrowStatus,
} from './entities/borrow-record.entity';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Fine } from '../fines/entities/fine.entity';

import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,

    private readonly mailService: MailService,
  ) {}

  async borrowBook(
    dto: CreateBorrowDto,
  ) {
    const member =
      await this.userRepository.findOne({
        where: {
          id: dto.memberId,
        },
      });

    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }

    const book =
      await this.bookRepository.findOne({
        where: {
          id: dto.bookId,
        },
      });

    if (!book) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    if (book.availableCopies <= 0) {
      throw new BadRequestException(
        'Book unavailable',
      );
    }

    const dueDate = new Date();

    dueDate.setDate(
      dueDate.getDate() + 14,
    );

    const borrow =
      this.borrowRepository.create({
        member,
        book,
        dueDate,
      });

    book.availableCopies--;

    await this.bookRepository.save(
      book,
    );

    const savedBorrow =
      await this.borrowRepository.save(
        borrow,
      );

    await this.mailService.sendBorrowEmail(
      member.email,
      book.title,
      dueDate,
    );

    return savedBorrow;
  }

  async returnBook(id: number) {
    const borrowRecord =
      await this.borrowRepository.findOne({
        where: { id },

        relations: {
          member: true,
          book: true,
        },
      });

    if (!borrowRecord) {
      throw new NotFoundException(
        'Borrow record not found',
      );
    }

    if (
      borrowRecord.status ===
      BorrowStatus.RETURNED
    ) {
      throw new BadRequestException(
        'Book already returned',
      );
    }

    borrowRecord.status =
      BorrowStatus.RETURNED;

    borrowRecord.returnedAt =
      new Date();

    borrowRecord.book.availableCopies++;

    await this.bookRepository.save(
      borrowRecord.book,
    );

    const dueDate =
      new Date(borrowRecord.dueDate);

    const returnedDate =
      new Date();

    const diffMs =
      returnedDate.getTime() -
      dueDate.getTime();

    const lateDays = Math.floor(
      diffMs /
        (1000 * 60 * 60 * 24),
    );

    if (lateDays > 0) {
      const fine =
        this.fineRepository.create({
          borrowRecord,
          amount: lateDays * 10,
          paid: false,
        });

      await this.fineRepository.save(
        fine,
      );
    }

    await this.borrowRepository.save(
      borrowRecord,
    );

    await this.mailService.sendReturnEmail(
      borrowRecord.member.email,
      borrowRecord.book.title,
    );

    return {
      message:
        'Book returned successfully',
    };
  }

  async getHistory() {
    return this.borrowRepository.find({
      relations: {
        member: true,
        book: true,
      },

      order: {
        borrowedAt: 'DESC',
      },
    });
  }

  async findAll() {
    return this.borrowRepository.find({
      relations: {
        member: true,
        book: true,
      },
    });
  }
}

