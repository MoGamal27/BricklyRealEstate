import { IsOptional, IsEnum, IsInt, IsBoolean } from 'class-validator';
import { PropertyType, PropertyStatus } from '../../common/enums';
import { Type } from 'class-transformer';

export class FilterPropertyDto {
  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  bedrooms?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  bathrooms?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  furnished?: boolean;

  @IsOptional()
  city?: string;

  @IsOptional()
  neighborhood?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;
}
