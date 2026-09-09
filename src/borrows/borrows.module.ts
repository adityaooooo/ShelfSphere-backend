<<<<<<< HEAD
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
=======
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
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
export class BorrowsModule {}