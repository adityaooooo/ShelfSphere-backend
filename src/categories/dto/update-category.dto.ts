<<<<<<< HEAD
import {
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
=======
import {
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}