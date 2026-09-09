import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

import {
  User,
  UserRole,
} from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import type { AuthenticatedUser } from '../auth/types/auth.types';

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

  private toSafeReservation(
    reservation: Reservation,
  ) {
    const { member, ...safeReservation } = reservation;
    const { password, ...safeMember } = member;

    return {
      ...safeReservation,
      member: safeMember,
    };
  }

  async create(
    body: CreateReservationDto,
    authenticatedUser: AuthenticatedUser,
  ) {
    if (
      authenticatedUser.role === UserRole.MEMBER &&
      authenticatedUser.id !== body.memberId
    ) {
      throw new ForbiddenException(
        'You can only create reservations for your own account',
      );
    }

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

    const savedReservation = await this.reservationRepository.save(
      reservation,
    );

    return this.toSafeReservation(savedReservation);
  }

  async findAll(
    authenticatedUser: AuthenticatedUser,
  ) {
    const reservations = await this.reservationRepository.find({
      where:
        authenticatedUser.role === UserRole.MEMBER
          ? {
              member: {
                id: authenticatedUser.id,
              },
            }
          : {},
      relations: [
        'member',
        'book',
      ],
    });

    return reservations.map((reservation) =>
      this.toSafeReservation(reservation),
    );
  }

  async findOne(
    id: number,
    authenticatedUser: AuthenticatedUser,
  ) {
    const reservation =
      await this.reservationRepository.findOne({
        where: { id },
        relations: ['member', 'book'],
      });

    if (!reservation) {
      throw new NotFoundException(
        'Reservation not found',
      );
    }

    if (
      authenticatedUser.role === UserRole.MEMBER &&
      reservation.member.id !== authenticatedUser.id
    ) {
      throw new ForbiddenException(
        'You can only view your own reservations',
      );
    }

    return this.toSafeReservation(reservation);
  }

  async remove(
    id: number,
    authenticatedUser: AuthenticatedUser,
  ) {
    const reservation =
      await this.reservationRepository.findOne({
        where: { id },
        relations: ['member'],
      });

    if (!reservation) {
      throw new NotFoundException(
        'Reservation not found',
      );
    }

    if (
      authenticatedUser.role === UserRole.MEMBER &&
      reservation.member.id !== authenticatedUser.id
    ) {
      throw new ForbiddenException(
        'You can only cancel your own reservations',
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
