import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
export declare class BorrowsController {
    private readonly borrowsService;
    constructor(borrowsService: BorrowsService);
    borrowBook(dto: CreateBorrowDto): Promise<import("./entities/borrow-record.entity").BorrowRecord>;
    returnBook(id: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/borrow-record.entity").BorrowRecord[]>;
    getHistory(): Promise<import("./entities/borrow-record.entity").BorrowRecord[]>;
}
