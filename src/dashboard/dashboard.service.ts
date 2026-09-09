<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../books/entities/book.entity';
import {
  BorrowRecord,
  BorrowStatus,
} from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getStats() {
    const totalUsers = await this.userRepository.count();
    const totalBooks = await this.bookRepository.count();
    const borrowedBooks = await this.borrowRepository.count({
      where: { status: BorrowStatus.BORROWED },
    });
    const totalBorrows = await this.borrowRepository.count();
    const unpaidFines = await this.fineRepository.count({
      where: { paid: false },
    });
    const availableBooks = await this.bookRepository
      .createQueryBuilder('book')
      .select('SUM(book.availableCopies)', 'total')
      .getRawOne<{ total: string | null }>();

    const borrowRecords = await this.borrowRepository.find({
      relations: {
        member: true,
        book: { categories: true },
      },
      order: { borrowedAt: 'DESC' },
    });

    const now = new Date();
    const activity = Array.from({ length: 4 }, (_, index) => {
      const end = new Date(now);
      end.setDate(now.getDate() - index * 7);
      end.setHours(23, 59, 59, 999);

      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      const records = borrowRecords.filter((record) => {
        const borrowedAt = new Date(record.borrowedAt);
        return borrowedAt >= start && borrowedAt <= end;
      });

      return {
        week: `Week ${4 - index}`,
        borrows: records.length,
        returned: records.filter(
          (record) => record.status === BorrowStatus.RETURNED,
        ).length,
      };
    }).reverse();

    const categoryCounts = new Map<string, number>();
    for (const record of borrowRecords) {
      for (const category of record.book.categories ?? []) {
        categoryCounts.set(
          category.name,
          (categoryCounts.get(category.name) ?? 0) + 1,
        );
      }
    }

    const topCategoryCounts = Array.from(categoryCounts.entries())
      .sort(([, first], [, second]) => second - first)
      .slice(0, 4);
    const topCategoryMax = topCategoryCounts[0]?.[1] ?? 1;
    const categories = topCategoryCounts.map(([name, count]) => ({
      name,
      percentage: Math.round((count / topCategoryMax) * 100),
    }));

    const recentActivity = borrowRecords.slice(0, 5).map((record) => ({
      id: record.id,
      memberName: record.member.fullName,
      bookTitle: record.book.title,
      borrowedAt: record.borrowedAt,
      returnedAt: record.returnedAt,
      dueDate: record.dueDate,
      status: record.status,
    }));

    return {
      totalUsers,
      totalBooks,
      borrowedBooks,
      totalBorrows,
      unpaidFines,
      availableBooks: Number(availableBooks?.total ?? 0),
      activity,
      categories,
      recentActivity,
    };
  }

  async getMemberDashboard(userId: number) {
    const borrows = await this.borrowRepository.find({
      where: { member: { id: userId } },
      relations: {
        member: true,
        book: { categories: true },
      },
      order: { borrowedAt: 'DESC' },
    });

    const reservations = await this.reservationRepository.find({
      where: { member: { id: userId } },
      relations: { member: true, book: true },
    });

    const fines = await this.fineRepository.find({
      relations: {
        borrowRecord: { member: true, book: true },
      },
    });
    const memberFines = fines.filter(
      (fine) => fine.borrowRecord?.member?.id === userId,
    );
    const currentBorrows = borrows.filter(
      (borrow) => borrow.status === BorrowStatus.BORROWED,
    );
    const booksRead = borrows.filter(
      (borrow) => borrow.status === BorrowStatus.RETURNED,
    ).length;
    const pendingFines = memberFines.filter((fine) => !fine.paid);

    const recommendations = await this.bookRepository.find({
      relations: { categories: true },
      take: 5,
      order: { id: 'DESC' },
    });
    const recentActivity = borrows.slice(0, 5).map((borrow) => ({
      id: borrow.id,
      bookTitle: borrow.book.title,
      borrowedAt: borrow.borrowedAt,
      returnedAt: borrow.returnedAt,
      dueDate: borrow.dueDate,
      status: borrow.status,
    }));

    return {
      borrowedBooks: currentBorrows.length,
      reservedBooks: reservations.length,
      pendingFines: pendingFines.length,
      totalFineAmount: pendingFines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0,
      ),
      booksRead,
      currentBorrows,
      reservations,
      recommendations,
      recentActivity,
      fines: pendingFines,
    };
  }
}
=======
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../books/entities/book.entity';
import {
  BorrowRecord,
  BorrowStatus,
} from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BorrowRecord)
    private readonly borrowRepository: Repository<BorrowRecord>,
    @InjectRepository(Fine)
    private readonly fineRepository: Repository<Fine>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getStats() {
    const totalUsers = await this.userRepository.count();
    const totalBooks = await this.bookRepository.count();
    const borrowedBooks = await this.borrowRepository.count({
      where: { status: BorrowStatus.BORROWED },
    });
    const totalBorrows = await this.borrowRepository.count();
    const unpaidFines = await this.fineRepository.count({
      where: { paid: false },
    });
    const availableBooks = await this.bookRepository
      .createQueryBuilder('book')
      .select('SUM(book.availableCopies)', 'total')
      .getRawOne<{ total: string | null }>();

    const borrowRecords = await this.borrowRepository.find({
      relations: {
        member: true,
        book: { categories: true },
      },
      order: { borrowedAt: 'DESC' },
    });

    const now = new Date();
    const activity = Array.from({ length: 4 }, (_, index) => {
      const end = new Date(now);
      end.setDate(now.getDate() - index * 7);
      end.setHours(23, 59, 59, 999);

      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      const records = borrowRecords.filter((record) => {
        const borrowedAt = new Date(record.borrowedAt);
        return borrowedAt >= start && borrowedAt <= end;
      });

      return {
        week: `Week ${4 - index}`,
        borrows: records.length,
        returned: records.filter(
          (record) => record.status === BorrowStatus.RETURNED,
        ).length,
      };
    }).reverse();

    const categoryCounts = new Map<string, number>();
    for (const record of borrowRecords) {
      for (const category of record.book.categories ?? []) {
        categoryCounts.set(
          category.name,
          (categoryCounts.get(category.name) ?? 0) + 1,
        );
      }
    }

    const topCategoryCounts = Array.from(categoryCounts.entries())
      .sort(([, first], [, second]) => second - first)
      .slice(0, 4);
    const topCategoryMax = topCategoryCounts[0]?.[1] ?? 1;
    const categories = topCategoryCounts.map(([name, count]) => ({
      name,
      percentage: Math.round((count / topCategoryMax) * 100),
    }));

    const recentActivity = borrowRecords.slice(0, 5).map((record) => ({
      id: record.id,
      memberName: record.member.fullName,
      bookTitle: record.book.title,
      borrowedAt: record.borrowedAt,
      returnedAt: record.returnedAt,
      dueDate: record.dueDate,
      status: record.status,
    }));

    return {
      totalUsers,
      totalBooks,
      borrowedBooks,
      totalBorrows,
      unpaidFines,
      availableBooks: Number(availableBooks?.total ?? 0),
      activity,
      categories,
      recentActivity,
    };
  }

  async getMemberDashboard(userId: number) {
    const borrows = await this.borrowRepository.find({
      where: { member: { id: userId } },
      relations: {
        member: true,
        book: { categories: true },
      },
      order: { borrowedAt: 'DESC' },
    });

    const reservations = await this.reservationRepository.find({
      where: { member: { id: userId } },
      relations: { member: true, book: true },
    });

    const fines = await this.fineRepository.find({
      relations: {
        borrowRecord: { member: true, book: true },
      },
    });
    const memberFines = fines.filter(
      (fine) => fine.borrowRecord?.member?.id === userId,
    );
    const currentBorrows = borrows.filter(
      (borrow) => borrow.status === BorrowStatus.BORROWED,
    );
    const booksRead = borrows.filter(
      (borrow) => borrow.status === BorrowStatus.RETURNED,
    ).length;
    const pendingFines = memberFines.filter((fine) => !fine.paid);

    const recommendations = await this.bookRepository.find({
      relations: { categories: true },
      take: 5,
      order: { id: 'DESC' },
    });
    const recentActivity = borrows.slice(0, 5).map((borrow) => ({
      id: borrow.id,
      bookTitle: borrow.book.title,
      borrowedAt: borrow.borrowedAt,
      returnedAt: borrow.returnedAt,
      dueDate: borrow.dueDate,
      status: borrow.status,
    }));

    return {
      borrowedBooks: currentBorrows.length,
      reservedBooks: reservations.length,
      pendingFines: pendingFines.length,
      totalFineAmount: pendingFines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0,
      ),
      booksRead,
      currentBorrows,
      reservations,
      recommendations,
      recentActivity,
      fines: pendingFines,
    };
  }
}
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
