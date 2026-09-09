<<<<<<< HEAD
import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsNumber()
  totalCopies: number;

  @IsArray()
  categoryIds: number[];
=======
import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsNumber()
  totalCopies: number;

  @IsArray()
  categoryIds: number[];
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}