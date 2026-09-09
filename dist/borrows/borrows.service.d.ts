import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { BorrowRecord } from './entities/borrow-record.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Fine } from '../fines/entities/fine.entity';
import { CreateBorrowDto } from './dto/create-borrow.dto';
export declare class BorrowsService {
    private readonly borrowRepository;
    private readonly userRepository;
    private readonly bookRepository;
    private readonly fineRepository;
    private readonly mailService;
    constructor(borrowRepository: Repository<BorrowRecord>, userRepository: Repository<User>, bookRepository: Repository<Book>, fineRepository: Repository<Fine>, mailService: MailService);
    borrowBook(dto: CreateBorrowDto): Promise<BorrowRecord>;
    returnBook(id: number): Promise<{
        message: string;
    }>;
    getHistory(): Promise<BorrowRecord[]>;
    findAll(): Promise<BorrowRecord[]>;
}
