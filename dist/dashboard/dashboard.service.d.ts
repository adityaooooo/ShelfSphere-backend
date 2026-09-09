import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { BorrowRecord, BorrowStatus } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
import { Reservation } from '../reservations/entities/reservation.entity';
import { User } from '../users/entities/user.entity';
export declare class DashboardService {
    private readonly userRepository;
    private readonly bookRepository;
    private readonly borrowRepository;
    private readonly fineRepository;
    private readonly reservationRepository;
    constructor(userRepository: Repository<User>, bookRepository: Repository<Book>, borrowRepository: Repository<BorrowRecord>, fineRepository: Repository<Fine>, reservationRepository: Repository<Reservation>);
    getStats(): Promise<{
        totalUsers: number;
        totalBooks: number;
        borrowedBooks: number;
        totalBorrows: number;
        unpaidFines: number;
        availableBooks: number;
        activity: {
            week: string;
            borrows: number;
            returned: number;
        }[];
        categories: {
            name: string;
            percentage: number;
        }[];
        recentActivity: {
            id: number;
            memberName: string;
            bookTitle: string;
            borrowedAt: Date;
            returnedAt: Date;
            dueDate: Date;
            status: BorrowStatus;
        }[];
    }>;
    getMemberDashboard(userId: number): Promise<{
        borrowedBooks: number;
        reservedBooks: number;
        pendingFines: number;
        totalFineAmount: number;
        booksRead: number;
        currentBorrows: BorrowRecord[];
        reservations: Reservation[];
        recommendations: Book[];
        recentActivity: {
            id: number;
            bookTitle: string;
            borrowedAt: Date;
            returnedAt: Date;
            dueDate: Date;
            status: BorrowStatus;
        }[];
        fines: Fine[];
    }>;
}
