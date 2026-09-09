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
}