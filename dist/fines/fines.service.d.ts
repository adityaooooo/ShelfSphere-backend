import { Repository } from 'typeorm';
import { Fine } from './entities/fine.entity';
import { BorrowRecord } from '../borrows/entities/borrow-record.entity';
import { CreateFineDto } from './dto/create-fine.dto';
export declare class FinesService {
    private readonly fineRepository;
    private readonly borrowRepository;
    constructor(fineRepository: Repository<Fine>, borrowRepository: Repository<BorrowRecord>);
    create(body: CreateFineDto): Promise<Fine>;
    findAll(): Promise<Fine[]>;
    payFine(id: number): Promise<Fine>;
}
