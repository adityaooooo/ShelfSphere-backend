<<<<<<< HEAD
import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateFineDto {
  @IsOptional()
  @IsBoolean()
  paid?: boolean;
=======
import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateFineDto {
  @IsOptional()
  @IsBoolean()
  paid?: boolean;
>>>>>>> ef79b6441a7561d64f7cada2d6c7133f2b9ec0f5
}