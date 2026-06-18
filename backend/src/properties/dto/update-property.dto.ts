import { IsOptional, IsEnum, IsInt, IsBoolean, IsNumber, IsDateString } from 'class-validator';
import { PropertyType, PropertyStatus } from '../../common/enums';

export class UpdatePropertyDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsInt()
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  bathrooms?: number;

  @IsOptional()
  @IsInt()
  area?: number;

  @IsOptional()
  @IsBoolean()
  furnished?: boolean;

  @IsOptional()
  @IsInt()
  level?: number;

  @IsOptional()
  compound?: string;

  @IsOptional()
  paymentOption?: string;

  @IsOptional()
  @IsDateString()
  deliveryDate?: Date;

  @IsOptional()
  city?: string;

  @IsOptional()
  neighborhood?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsInt()
  aiPriceSuggested?: number;
}
