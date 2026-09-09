import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookQueryDto } from './dto/book-query.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<import("./entities/book.entity").Book>;
    findAll(query: BookQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: import("./entities/book.entity").Book[];
    }>;
    findOne(id: string): Promise<import("./entities/book.entity").Book>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
