import {
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateFineDto {
  @IsOptional()
  @IsBoolean()
  paid?: boolean;
}