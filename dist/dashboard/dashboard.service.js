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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../books/entities/book.entity");
const borrow_record_entity_1 = require("../borrows/entities/borrow-record.entity");
const fine_entity_1 = require("../fines/entities/fine.entity");
const reservation_entity_1 = require("../reservations/entities/reservation.entity");
const user_entity_1 = require("../users/entities/user.entity");
let DashboardService = class DashboardService {
    userRepository;
    bookRepository;
    borrowRepository;
    fineRepository;
    reservationRepository;
    constructor(userRepository, bookRepository, borrowRepository, fineRepository, reservationRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
        this.fineRepository = fineRepository;
        this.reservationRepository = reservationRepository;
    }
    async getStats() {
        const totalUsers = await this.userRepository.count();
        const totalBooks = await this.bookRepository.count();
        const borrowedBooks = await this.borrowRepository.count({
            where: { status: borrow_record_entity_1.BorrowStatus.BORROWED },
        });
        const totalBorrows = await this.borrowRepository.count();
        const unpaidFines = await this.fineRepository.count({
            where: { paid: false },
        });
        const availableBooks = await this.bookRepository
            .createQueryBuilder('book')
            .select('SUM(book.availableCopies)', 'total')
            .getRawOne();
        const borrowRecords = await this.borrowRepository.find({
            relations: {
                member: true,
                book: { categories: true },
            },
            order: { borrowedAt: 'DESC' },
        });
        const now = new Date();
        const activity = Array.from({ length: 4 }, (_, index) => {
            const end = new Date(now);
            end.setDate(now.getDate() - index * 7);
            end.setHours(23, 59, 59, 999);
            const start = new Date(end);
            start.setDate(end.getDate() - 6);
            start.setHours(0, 0, 0, 0);
            const records = borrowRecords.filter((record) => {
                const borrowedAt = new Date(record.borrowedAt);
                return borrowedAt >= start && borrowedAt <= end;
            });
            return {
                week: `Week ${4 - index}`,
                borrows: records.length,
                returned: records.filter((record) => record.status === borrow_record_entity_1.BorrowStatus.RETURNED).length,
            };
        }).reverse();
        const categoryCounts = new Map();
        for (const record of borrowRecords) {
            for (const category of record.book.categories ?? []) {
                categoryCounts.set(category.name, (categoryCounts.get(category.name) ?? 0) + 1);
            }
        }
        const topCategoryCounts = Array.from(categoryCounts.entries())
            .sort(([, first], [, second]) => second - first)
            .slice(0, 4);
        const topCategoryMax = topCategoryCounts[0]?.[1] ?? 1;
        const categories = topCategoryCounts.map(([name, count]) => ({
            name,
            percentage: Math.round((count / topCategoryMax) * 100),
        }));
        const recentActivity = borrowRecords.slice(0, 5).map((record) => ({
            id: record.id,
            memberName: record.member.fullName,
            bookTitle: record.book.title,
            borrowedAt: record.borrowedAt,
            returnedAt: record.returnedAt,
            dueDate: record.dueDate,
            status: record.status,
        }));
        return {
            totalUsers,
            totalBooks,
            borrowedBooks,
            totalBorrows,
            unpaidFines,
            availableBooks: Number(availableBooks?.total ?? 0),
            activity,
            categories,
            recentActivity,
        };
    }
    async getMemberDashboard(userId) {
        const borrows = await this.borrowRepository.find({
            where: { member: { id: userId } },
            relations: {
                member: true,
                book: { categories: true },
            },
            order: { borrowedAt: 'DESC' },
        });
        const reservations = await this.reservationRepository.find({
            where: { member: { id: userId } },
            relations: { member: true, book: true },
        });
        const fines = await this.fineRepository.find({
            relations: {
                borrowRecord: { member: true, book: true },
            },
        });
        const memberFines = fines.filter((fine) => fine.borrowRecord?.member?.id === userId);
        const currentBorrows = borrows.filter((borrow) => borrow.status === borrow_record_entity_1.BorrowStatus.BORROWED);
        const booksRead = borrows.filter((borrow) => borrow.status === borrow_record_entity_1.BorrowStatus.RETURNED).length;
        const pendingFines = memberFines.filter((fine) => !fine.paid);
        const recommendations = await this.bookRepository.find({
            relations: { categories: true },
            take: 5,
            order: { id: 'DESC' },
        });
        const recentActivity = borrows.slice(0, 5).map((borrow) => ({
            id: borrow.id,
            bookTitle: borrow.book.title,
            borrowedAt: borrow.borrowedAt,
            returnedAt: borrow.returnedAt,
            dueDate: borrow.dueDate,
            status: borrow.status,
        }));
        return {
            borrowedBooks: currentBorrows.length,
            reservedBooks: reservations.length,
            pendingFines: pendingFines.length,
            totalFineAmount: pendingFines.reduce((sum, fine) => sum + Number(fine.amount), 0),
            booksRead,
            currentBorrows,
            reservations,
            recommendations,
            recentActivity,
            fines: pendingFines,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(borrow_record_entity_1.BorrowRecord)),
    __param(3, (0, typeorm_1.InjectRepository)(fine_entity_1.Fine)),
    __param(4, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map