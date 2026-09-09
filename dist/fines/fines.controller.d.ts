import { FinesService } from './fines.service';
import { CreateFineDto } from './dto/create-fine.dto';
export declare class FinesController {
    private readonly finesService;
    constructor(finesService: FinesService);
    create(body: CreateFineDto): Promise<import("./entities/fine.entity").Fine>;
    findAll(): Promise<import("./entities/fine.entity").Fine[]>;
    payFine(id: string): Promise<import("./entities/fine.entity").Fine>;
}
