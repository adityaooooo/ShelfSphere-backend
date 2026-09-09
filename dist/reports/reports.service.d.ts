import { Repository } from 'typeorm';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { Fine } from '../fines/entities/fine.entity';
export declare class ReportsService {
    private readonly borrowRepository;
    private readonly fineRepository;
    constructor(borrowRepository: Repository<BorrowRecord>, fineRepository: Repository<Fine>);
    mostBorrowedBooks(): Promise<any[]>;
    overdueBooks(): Promise<BorrowRecord[]>;
    topMembers(): Promise<any[]>;
    finesReport(): Promise<{
        totalFines: number;
        paidFines: number;
        unpaidFines: number;
    }>;
}
