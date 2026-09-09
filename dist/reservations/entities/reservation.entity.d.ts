import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';
export declare class Reservation {
    id: number;
    member: User;
    book: Book;
    reservedAt: Date;
}
