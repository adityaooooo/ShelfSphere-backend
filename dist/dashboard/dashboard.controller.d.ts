import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
            status: import("../borrows/entities/borrow-record.entity").BorrowStatus;
        }[];
    }>;
    getMemberDashboard(req: any): Promise<{
        borrowedBooks: number;
        reservedBooks: number;
        pendingFines: number;
        totalFineAmount: number;
        booksRead: number;
        currentBorrows: import("../borrows/entities/borrow-record.entity").BorrowRecord[];
        reservations: import("../reservations/entities/reservation.entity").Reservation[];
        recommendations: import("../books/entities/book.entity").Book[];
        recentActivity: {
            id: number;
            bookTitle: string;
            borrowedAt: Date;
            returnedAt: Date;
            dueDate: Date;
            status: import("../borrows/entities/borrow-record.entity").BorrowStatus;
        }[];
        fines: import("../fines/entities/fine.entity").Fine[];
    }>;
}
