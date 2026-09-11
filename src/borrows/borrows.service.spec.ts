import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BorrowsService } from './borrows.service';
import { Book } from '../books/entities/book.entity';
import { Fine } from '../fines/entities/fine.entity';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { BorrowRecord } from './entities/borrow-record.entity';

describe('BorrowsService', () => {
  let service: BorrowsService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          BorrowsService,
          {
            provide: getRepositoryToken(BorrowRecord),
            useValue: {},
          },
          {
            provide: getRepositoryToken(User),
            useValue: {},
          },
          {
            provide: getRepositoryToken(Book),
            useValue: {},
          },
          {
            provide: getRepositoryToken(Fine),
            useValue: {},
          },
          {
            provide: MailService,
            useValue: {},
          },
        ],
      }).compile();

    service =
      module.get<BorrowsService>(
        BorrowsService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
