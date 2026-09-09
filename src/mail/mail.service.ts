import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
  ) {}

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  private async sendEmail(
    to: string,
    subject: string,
    html: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html,
      });
    } catch (error) {
      this.logger.warn(
        `Failed to send email to ${to}: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`,
      );
    }
  }

  async sendBorrowEmail(
    email: string,
    bookTitle: string,
    dueDate: Date,
  ) {
    await this.sendEmail(
      email,
      `Borrow Confirmation - ${bookTitle}`,
      `
        <h2>Borrow Successful</h2>

        <p>Book: ${bookTitle}</p>

        <p>Due Date:
        ${this.formatDate(dueDate)}</p>

        <p>Please return the book before the due date.</p>
      `,
    );
  }

  async sendReturnEmail(
    email: string,
    bookTitle: string,
  ) {
    await this.sendEmail(
      email,
      `Return Confirmation - ${bookTitle}`,
      `
        <h2>Book Returned</h2>

        <p>Book: ${bookTitle}</p>

        <p>Thank you for returning the book.</p>
      `,
    );
  }
}