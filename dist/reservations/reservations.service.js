"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
const user_entity_1 = require("../users/entities/user.entity");
const book_entity_1 = require("../books/entities/book.entity");
let ReservationsService = class ReservationsService {
    reservationRepository;
    userRepository;
    bookRepository;
    constructor(reservationRepository, userRepository, bookRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    async create(body) {
        const member = await this.userRepository.findOne({
            where: {
                id: body.memberId,
            },
        });
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        const book = await this.bookRepository.findOne({
            where: {
                id: body.bookId,
            },
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        const existingReservation = await this.reservationRepository.findOne({
            where: {
                member: { id: body.memberId },
                book: { id: body.bookId },
            },
            relations: ['member', 'book'],
        });
        if (existingReservation) {
            throw new common_1.BadRequestException('Reservation already exists');
        }
        const reservation = this.reservationRepository.create({
            member,
            book,
        });
        return this.reservationRepository.save(reservation);
    }
    async findAll() {
        return this.reservationRepository.find({
            relations: [
                'member',
                'book',
            ],
        });
    }
    async remove(id) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
        });
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        await this.reservationRepository.delete(id);
        return {
            message: 'Reservation cancelled successfully',
        };
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map