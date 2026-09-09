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
exports.FinesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fine_entity_1 = require("./entities/fine.entity");
const borrow_record_entity_1 = require("../borrows/entities/borrow-record.entity");
let FinesService = class FinesService {
    fineRepository;
    borrowRepository;
    constructor(fineRepository, borrowRepository) {
        this.fineRepository = fineRepository;
        this.borrowRepository = borrowRepository;
    }
    async create(body) {
        const borrowRecord = await this.borrowRepository.findOne({
            where: {
                id: body.borrowRecordId,
            },
        });
        if (!borrowRecord) {
            throw new common_1.NotFoundException('Borrow record not found');
        }
        const fine = this.fineRepository.create({
            amount: body.amount,
            borrowRecord,
        });
        return this.fineRepository.save(fine);
    }
    async findAll() {
        return this.fineRepository.find({
            relations: {
                borrowRecord: true,
            },
        });
    }
    async payFine(id) {
        const fine = await this.fineRepository.findOne({
            where: { id },
        });
        if (!fine) {
            throw new common_1.NotFoundException('Fine not found');
        }
        fine.paid = true;
        return this.fineRepository.save(fine);
    }
};
exports.FinesService = FinesService;
exports.FinesService = FinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fine_entity_1.Fine)),
    __param(1, (0, typeorm_1.InjectRepository)(borrow_record_entity_1.BorrowRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FinesService);
//# sourceMappingURL=fines.service.js.map