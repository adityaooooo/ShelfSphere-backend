<<<<<<< HEAD
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
=======
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
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}