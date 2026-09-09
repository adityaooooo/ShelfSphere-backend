import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    private readonly logger;
    constructor(mailerService: MailerService);
    private formatDate;
    private sendEmail;
    sendBorrowEmail(email: string, bookTitle: string, dueDate: Date): Promise<void>;
    sendReturnEmail(email: string, bookTitle: string): Promise<void>;
}
