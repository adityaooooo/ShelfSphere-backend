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
exports.BorrowsController = void 0;
const common_1 = require("@nestjs/common");
const borrows_service_1 = require("./borrows.service");
const create_borrow_dto_1 = require("./dto/create-borrow.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../users/entities/user.entity");
let BorrowsController = class BorrowsController {
    borrowsService;
    constructor(borrowsService) {
        this.borrowsService = borrowsService;
    }
    borrowBook(dto) {
        return this.borrowsService.borrowBook(dto);
    }
    returnBook(id) {
        return this.borrowsService.returnBook(Number(id));
    }
    findAll() {
        return this.borrowsService.findAll();
    }
    getHistory() {
        return this.borrowsService.getHistory();
    }
};
exports.BorrowsController = BorrowsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.LIBRARIAN, user_entity_1.UserRole.MEMBER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_borrow_dto_1.CreateBorrowDto]),
    __metadata("design:returntype", void 0)
], BorrowsController.prototype, "borrowBook", null);
__decorate([
    (0, common_1.Patch)(':id/return'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.LIBRARIAN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BorrowsController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.LIBRARIAN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BorrowsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BorrowsController.prototype, "getHistory", null);
exports.BorrowsController = BorrowsController = __decorate([
    (0, common_1.Controller)('borrows'),
    __metadata("design:paramtypes", [borrows_service_1.BorrowsService])
], BorrowsController);
//# sourceMappingURL=borrows.controller.js.map