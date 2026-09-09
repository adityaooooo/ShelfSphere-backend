import { BookQueryDto } from './dto/book-query.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly bookRepository;
    private readonly categoryRepository;
    constructor(bookRepository: Repository<Book>, categoryRepository: Repository<Category>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(query: BookQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: Book[];
    }>;
    findOne(id: number): Promise<Book>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
