import { IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  memberId: number;

  @IsNumber()
  bookId: number;
}