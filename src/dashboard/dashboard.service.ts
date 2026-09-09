import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { User, UserRole } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { BorrowRecord, BorrowStatus } from '../borrows/entities/borrow-record.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { Fine } from '../fines/entities/fine.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Book) private readonly books: Repository<Book>,
    @InjectRepository(BorrowRecord) private readonly borrows: Repository<BorrowRecord>,
    @InjectRepository(Reservation) private readonly reservations: Repository<Reservation>,
    @InjectRepository(Fine) private readonly fines: Repository<Fine>,
  ) {}

  async getStats() {
    const [totalUsers, totalBooks, borrowedBooks, available, unpaidFines, totalBorrows] =
      await Promise.all([
        this.users.count({ where: { role: UserRole.MEMBER } }),
        this.books.count(),
        this.borrows.count({ where: { status: BorrowStatus.BORROWED } }),
        this.books.createQueryBuilder('book')
          .select('COALESCE(SUM(book.availableCopies), 0)', 'total')
          .getRawOne<{ total: string }>(),
        this.fines.find({ where: { paid: false } }),
        this.borrows.count(),
      ]);

    const [recent, allBooks] = await Promise.all([
      this.borrows.find({
        relations: { member: true, book: true },
        order: { borrowedAt: 'DESC' },
        take: 10,
      }),
      this.books.find({ relations: { categories: true } }),
    ]);

    const counts = new Map<string, number>();
    for (const book of allBooks) {
      for (const category of book.categories ?? []) {
        counts.set(category.name, (counts.get(category.name) ?? 0) + 1);
      }
    }
    const categoryTotal = [...counts.values()].reduce((sum, count) => sum + count, 0);

    return {
      totalUsers,
      totalBooks,
      borrowedBooks,
      availableBooks: Number(available?.total ?? 0),
      totalBorrows,
      unpaidFines: unpaidFines.reduce((sum, fine) => sum + Number(fine.amount), 0),
      activity: await this.getActivity(),
      categories: [...counts.entries()]
        .sort(([, left], [, right]) => right - left)
        .slice(0, 6)
        .map(([name, count]) => ({
          name,
          count,
          percentage: categoryTotal ? Math.round((count / categoryTotal) * 100) : 0,
        })),
      recentActivity: recent.map((borrow) => ({
        id: borrow.id,
        memberName: borrow.member?.fullName ?? 'Unknown member',
        bookTitle: borrow.book?.title ?? 'Unknown book',
        borrowedAt: borrow.borrowedAt,
        returnedAt: borrow.returnedAt,
        dueDate: borrow.dueDate,
        status: borrow.status,
      })),
    };
  }

  async getMemberDashboard(userId: number) {
    const [currentBorrows, allBorrows, reservations, fines, recommendations] =
      await Promise.all([
        this.borrows.find({
          where: { member: { id: userId }, status: BorrowStatus.BORROWED },
          relations: { book: { categories: true } },
          order: { dueDate: 'ASC' },
        }),
        this.borrows.find({
          where: { member: { id: userId } },
          relations: { book: { categories: true } },
          order: { borrowedAt: 'DESC' },
          take: 20,
        }),
        this.reservations.find({
          where: { member: { id: userId } },
          relations: { book: { categories: true } },
          order: { reservedAt: 'DESC' },
        }),
        this.fines.find({
          where: { paid: false, borrowRecord: { member: { id: userId } } },
          relations: { borrowRecord: { book: true } },
          order: { createdAt: 'DESC' },
        }),
        this.books.createQueryBuilder('book')
          .leftJoinAndSelect('book.categories', 'category')
          .where('book.availableCopies > 0')
          .orderBy('book.title', 'ASC')
          .take(6)
          .getMany(),
      ]);

    return {
      borrowedBooks: currentBorrows.length,
      reservedBooks: reservations.length,
      pendingFines: fines.length,
      totalFineAmount: fines.reduce((sum, fine) => sum + Number(fine.amount), 0),
      booksRead: allBorrows.filter((borrow) => borrow.status === BorrowStatus.RETURNED).length,
      currentBorrows,
      reservations,
      recommendations,
      recentActivity: allBorrows.map((borrow) => ({
        id: borrow.id,
        bookTitle: borrow.book?.title ?? 'Unknown book',
        borrowedAt: borrow.borrowedAt,
        returnedAt: borrow.returnedAt,
        dueDate: borrow.dueDate,
        status: borrow.status,
      })),
      fines: fines.map((fine) => ({
        id: fine.id,
        amount: Number(fine.amount),
        paid: fine.paid,
        createdAt: fine.createdAt,
      })),
    };
  }

  private async getActivity() {
    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    const records = await this.borrows.find({ where: { borrowedAt: Between(start, end) } });

    return Array.from({ length: 7 }, (_, offset) => {
      const date = new Date(start);
      date.setDate(start.getDate() + offset);
      const key = date.toISOString().slice(0, 10);
      const day = records.filter((record) =>
        new Date(record.borrowedAt).toISOString().slice(0, 10) === key,
      );
      return {
        week: date.toLocaleDateString('en-US', { weekday: 'short' }),
        borrows: day.length,
        returned: day.filter((record) =>
          record.status === BorrowStatus.RETURNED &&
          record.returnedAt &&
          new Date(record.returnedAt).toISOString().slice(0, 10) === key,
        ).length,
      };
    });
  }
}
