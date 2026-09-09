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
exports.FinesController = void 0;
const common_1 = require("@nestjs/common");
const fines_service_1 = require("./fines.service");
const create_fine_dto_1 = require("./dto/create-fine.dto");
let FinesController = class FinesController {
    finesService;
    constructor(finesService) {
        this.finesService = finesService;
    }
    create(body) {
        return this.finesService.create(body);
    }
    findAll() {
        return this.finesService.findAll();
    }
    payFine(id) {
        return this.finesService.payFine(Number(id));
    }
};
exports.FinesController = FinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fine_dto_1.CreateFineDto]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/pay'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinesController.prototype, "payFine", null);
exports.FinesController = FinesController = __decorate([
    (0, common_1.Controller)('fines'),
    __metadata("design:paramtypes", [fines_service_1.FinesService])
], FinesController);
//# sourceMappingURL=fines.controller.js.map