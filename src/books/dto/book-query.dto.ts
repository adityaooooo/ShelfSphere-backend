<<<<<<< HEAD
import {
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class BookQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
=======
import {
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class BookQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}