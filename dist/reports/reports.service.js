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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const borrow_record_entity_1 = require("../borrows/entities/borrow-record.entity");
const fine_entity_1 = require("../fines/entities/fine.entity");
let ReportsService = class ReportsService {
    borrowRepository;
    fineRepository;
    constructor(borrowRepository, fineRepository) {
        this.borrowRepository = borrowRepository;
        this.fineRepository = fineRepository;
    }
    async mostBorrowedBooks() {
        return this.borrowRepository
            .createQueryBuilder('borrow')
            .leftJoin('borrow.book', 'book')
            .select('book.title', 'title')
            .addSelect('COUNT(book.id)', 'borrowCount')
            .groupBy('book.title')
            .orderBy('COUNT(book.id)', 'DESC')
            .limit(10)
            .getRawMany();
    }
    async overdueBooks() {
        return this.borrowRepository.find({
            where: {
                status: borrow_record_entity_1.BorrowStatus.BORROWED,
            },
            relations: {
                book: true,
                member: true,
            },
        }).then((records) => records.filter((record) => new Date(record.dueDate) < new Date()));
    }
    async topMembers() {
        return this.borrowRepository
            .createQueryBuilder('borrow')
            .leftJoin('borrow.member', 'member')
            .select('member.fullName', 'member')
            .addSelect('COUNT(member.id)', 'borrowCount')
            .groupBy('member.fullName')
            .orderBy('COUNT(member.id)', 'DESC')
            .limit(10)
            .getRawMany();
    }
    async finesReport() {
        const fines = await this.fineRepository.find();
        const totalFines = fines.reduce((sum, fine) => sum +
            Number(fine.amount), 0);
        const paidFines = fines
            .filter((fine) => fine.paid)
            .reduce((sum, fine) => sum +
            Number(fine.amount), 0);
        const unpaidFines = totalFines -
            paidFines;
        return {
            totalFines,
            paidFines,
            unpaidFines,
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borrow_record_entity_1.BorrowRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(fine_entity_1.Fine)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map