import { Category } from '../../categories/entities/category.entity';
import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
export declare class Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    description: string;
    totalCopies: number;
    availableCopies: number;
    categories: Category[];
    borrowRecords: BorrowRecord[];
    reservations: Reservation[];
}
