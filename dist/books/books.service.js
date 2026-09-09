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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let BooksService = class BooksService {
    bookRepository;
    categoryRepository;
    constructor(bookRepository, categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createBookDto) {
        const categories = await this.categoryRepository.find({
            where: {
                id: (0, typeorm_3.In)(createBookDto.categoryIds),
            },
        });
        const book = this.bookRepository.create({
            isbn: createBookDto.isbn,
            title: createBookDto.title,
            author: createBookDto.author,
            description: createBookDto.description,
            totalCopies: createBookDto.totalCopies,
            availableCopies: createBookDto.totalCopies,
            categories,
        });
        return this.bookRepository.save(book);
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const [books, total] = await this.bookRepository.findAndCount({
            where: query.search
                ? [
                    {
                        title: (0, typeorm_2.ILike)(`%${query.search}%`),
                    },
                    {
                        author: (0, typeorm_2.ILike)(`%${query.search}%`),
                    },
                ]
                : {},
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                categories: true,
            },
        });
        return {
            total,
            page,
            limit,
            data: books,
        };
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({
            where: { id },
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async remove(id) {
        await this.findOne(id);
        await this.bookRepository.delete(id);
        return {
            message: 'Book deleted successfully',
        };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map