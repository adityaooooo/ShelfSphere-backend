import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository:
      Repository<Reservation>,

    @InjectRepository(User)
    private readonly userRepository:
      Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository:
      Repository<Book>,
  ) {}

  async create(
    body: CreateReservationDto,
  ) {
    const member =
      await this.userRepository.findOne({
        where: {
          id: body.memberId,
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
          id: body.bookId,
        },
      });

    if (!book) {
      throw new NotFoundException(
        'Book not found',
      );
    }

    const existingReservation =
      await this.reservationRepository.findOne({
        where: {
          member: { id: body.memberId },
          book: { id: body.bookId },
        },
        relations: ['member', 'book'],
      });

    if (existingReservation) {
      throw new BadRequestException(
        'Reservation already exists',
      );
    }

    const reservation =
      this.reservationRepository.create({
        member,
        book,
      });

    return this.reservationRepository.save(
      reservation,
    );
  }

  async findAll() {
    return this.reservationRepository.find({
      relations: [
        'member',
        'book',
      ],
    });
  }

  async remove(id: number) {
    const reservation =
      await this.reservationRepository.findOne({
        where: { id },
      });

    if (!reservation) {
      throw new NotFoundException(
        'Reservation not found',
      );
    }

    await this.reservationRepository.delete(
      id,
    );

    return {
      message:
        'Reservation cancelled successfully',
    };
  }
}