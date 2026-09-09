<<<<<<< HEAD
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
=======
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}