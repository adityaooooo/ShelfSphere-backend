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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = MailService_1 = class MailService {
    mailerService;
    logger = new common_1.Logger(MailService_1.name);
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    }
    async sendEmail(to, subject, html) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html,
            });
        }
        catch (error) {
            this.logger.warn(`Failed to send email to ${to}: ${error instanceof Error
                ? error.message
                : String(error)}`);
        }
    }
    async sendBorrowEmail(email, bookTitle, dueDate) {
        await this.sendEmail(email, `Borrow Confirmation - ${bookTitle}`, `
        <h2>Borrow Successful</h2>

        <p>Book: ${bookTitle}</p>

        <p>Due Date:
        ${this.formatDate(dueDate)}</p>

        <p>Please return the book before the due date.</p>
      `);
    }
    async sendReturnEmail(email, bookTitle) {
        await this.sendEmail(email, `Return Confirmation - ${bookTitle}`, `
        <h2>Book Returned</h2>

        <p>Book: ${bookTitle}</p>

        <p>Thank you for returning the book.</p>
      `);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map