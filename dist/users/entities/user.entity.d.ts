import { BorrowRecord } from '../../borrows/entities/borrow-record.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';
export declare enum UserRole {
    MEMBER = "MEMBER",
    LIBRARIAN = "LIBRARIAN",
    ADMIN = "ADMIN"
}
export declare class User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone: string;
    memberId: string;
    staffId: string;
    role: UserRole;
    borrowRecords: BorrowRecord[];
    reservations: Reservation[];
}
