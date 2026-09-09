import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';
export declare class Fine {
    id: number;
    borrowRecord: BorrowRecord;
    amount: number;
    paid: boolean;
    createdAt: Date;
}
