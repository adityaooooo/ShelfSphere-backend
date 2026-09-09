import {
  IsNumber,
} from 'class-validator';

export class CreateFineDto {
  @IsNumber()
  borrowRecordId: number;

  @IsNumber()
  amount: number;
}