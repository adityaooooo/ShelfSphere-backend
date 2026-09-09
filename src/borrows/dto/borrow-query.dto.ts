import {
  IsOptional,
  IsEnum,
} from 'class-validator';

import {
  BorrowStatus,
} from '../entities/borrow-record.entity';

export class BorrowQueryDto {
  @IsOptional()
  @IsEnum(BorrowStatus)
  status?: BorrowStatus;
}