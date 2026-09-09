import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';
import { Fine } from '../../fines/entities/fine.entity';
export declare enum BorrowStatus {
    BORROWED = "BORROWED",
    RETURNED = "RETURNED"
}
export declare class BorrowRecord {
    id: number;
    member: User;
    book: Book;
    fines: Fine[];
    borrowedAt: Date;
    dueDate: Date;
    returnedAt: Date;
    status: BorrowStatus;
}
