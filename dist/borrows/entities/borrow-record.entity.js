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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRecord = exports.BorrowStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const book_entity_1 = require("../../books/entities/book.entity");
const fine_entity_1 = require("../../fines/entities/fine.entity");
var BorrowStatus;
(function (BorrowStatus) {
    BorrowStatus["BORROWED"] = "BORROWED";
    BorrowStatus["RETURNED"] = "RETURNED";
})(BorrowStatus || (exports.BorrowStatus = BorrowStatus = {}));
let BorrowRecord = class BorrowRecord {
    id;
    member;
    book;
    fines;
    borrowedAt;
    dueDate;
    returnedAt;
    status;
};
exports.BorrowRecord = BorrowRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BorrowRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.borrowRecords, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], BorrowRecord.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (book) => book.borrowRecords, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", book_entity_1.Book)
], BorrowRecord.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fine_entity_1.Fine, (fine) => fine.borrowRecord),
    __metadata("design:type", Array)
], BorrowRecord.prototype, "fines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BorrowRecord.prototype, "borrowedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], BorrowRecord.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], BorrowRecord.prototype, "returnedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BorrowStatus,
        default: BorrowStatus.BORROWED,
    }),
    __metadata("design:type", String)
], BorrowRecord.prototype, "status", void 0);
exports.BorrowRecord = BorrowRecord = __decorate([
    (0, typeorm_1.Entity)('borrow_records')
], BorrowRecord);
//# sourceMappingURL=borrow-record.entity.js.map