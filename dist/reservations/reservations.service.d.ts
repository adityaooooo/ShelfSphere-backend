import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
export declare class ReservationsService {
    private readonly reservationRepository;
    private readonly userRepository;
    private readonly bookRepository;
    constructor(reservationRepository: Repository<Reservation>, userRepository: Repository<User>, bookRepository: Repository<Book>);
    create(body: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
