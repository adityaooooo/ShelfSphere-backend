<<<<<<< HEAD
import {
  IsNumber,
} from 'class-validator';

export class CreateFineDto {
  @IsNumber()
  borrowRecordId: number;

  @IsNumber()
  amount: number;
=======
import {
  IsNumber,
} from 'class-validator';

export class CreateFineDto {
  @IsNumber()
  borrowRecordId: number;

  @IsNumber()
  amount: number;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}