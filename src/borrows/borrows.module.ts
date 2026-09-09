import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';

import { BorrowRecord } from './entities/borrow-record.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Fine } from '../fines/entities/fine.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BorrowRecord,
      User,
      Book,
      Fine,
    ]),
     MailModule,
  ],

  controllers: [BorrowsController],

  providers: [BorrowsService],

  exports: [BorrowsService],
})
export class BorrowsModule {}