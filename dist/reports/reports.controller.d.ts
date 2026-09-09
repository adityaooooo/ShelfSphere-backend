import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    mostBorrowedBooks(): Promise<any[]>;
    overdueBooks(): Promise<import("../borrows/entities/borrow-record.entity").BorrowRecord[]>;
    topMembers(): Promise<any[]>;
    finesReport(): Promise<{
        totalFines: number;
        paidFines: number;
        unpaidFines: number;
    }>;
}
