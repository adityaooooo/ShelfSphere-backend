import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  totalCopies?: number;

  @IsOptional()
  @IsArray()
  categoryIds?: number[];
}
