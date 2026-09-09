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
exports.BorrowsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("../mail/mail.service");
const borrow_record_entity_1 = require("./entities/borrow-record.entity");
const user_entity_1 = require("../users/entities/user.entity");
const book_entity_1 = require("../books/entities/book.entity");
const fine_entity_1 = require("../fines/entities/fine.entity");
let BorrowsService = class BorrowsService {
    borrowRepository;
    userRepository;
    bookRepository;
    fineRepository;
    mailService;
    constructor(borrowRepository, userRepository, bookRepository, fineRepository, mailService) {
        this.borrowRepository = borrowRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.fineRepository = fineRepository;
        this.mailService = mailService;
    }
    async borrowBook(dto) {
        const member = await this.userRepository.findOne({
            where: {
                id: dto.memberId,
            },
        });
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        const book = await this.bookRepository.findOne({
            where: {
                id: dto.bookId,
            },
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        if (book.availableCopies <= 0) {
            throw new common_1.BadRequestException('Book unavailable');
        }
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        const borrow = this.borrowRepository.create({
            member,
            book,
            dueDate,
        });
        book.availableCopies--;
        await this.bookRepository.save(book);
        const savedBorrow = await this.borrowRepository.save(borrow);
        await this.mailService.sendBorrowEmail(member.email, book.title, dueDate);
        return savedBorrow;
    }
    async returnBook(id) {
        const borrowRecord = await this.borrowRepository.findOne({
            where: { id },
            relations: {
                member: true,
                book: true,
            },
        });
        if (!borrowRecord) {
            throw new common_1.NotFoundException('Borrow record not found');
        }
        if (borrowRecord.status ===
            borrow_record_entity_1.BorrowStatus.RETURNED) {
            throw new common_1.BadRequestException('Book already returned');
        }
        borrowRecord.status =
            borrow_record_entity_1.BorrowStatus.RETURNED;
        borrowRecord.returnedAt =
            new Date();
        borrowRecord.book.availableCopies++;
        await this.bookRepository.save(borrowRecord.book);
        const dueDate = new Date(borrowRecord.dueDate);
        const returnedDate = new Date();
        const diffMs = returnedDate.getTime() -
            dueDate.getTime();
        const lateDays = Math.floor(diffMs /
            (1000 * 60 * 60 * 24));
        if (lateDays > 0) {
            const fine = this.fineRepository.create({
                borrowRecord,
                amount: lateDays * 10,
                paid: false,
            });
            await this.fineRepository.save(fine);
        }
        await this.borrowRepository.save(borrowRecord);
        await this.mailService.sendReturnEmail(borrowRecord.member.email, borrowRecord.book.title);
        return {
            message: 'Book returned successfully',
        };
    }
    async getHistory() {
        return this.borrowRepository.find({
            relations: {
                member: true,
                book: true,
            },
            order: {
                borrowedAt: 'DESC',
            },
        });
    }
    async findAll() {
        return this.borrowRepository.find({
            relations: {
                member: true,
                book: true,
            },
        });
    }
};
exports.BorrowsService = BorrowsService;
exports.BorrowsService = BorrowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borrow_record_entity_1.BorrowRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(3, (0, typeorm_1.InjectRepository)(fine_entity_1.Fine)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], BorrowsService);
//# sourceMappingURL=borrows.service.js.map