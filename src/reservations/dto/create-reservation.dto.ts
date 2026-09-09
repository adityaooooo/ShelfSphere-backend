<<<<<<< HEAD
import { IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  memberId: number;

  @IsNumber()
  bookId: number;
=======
import { IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  memberId: number;

  @IsNumber()
  bookId: number;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}