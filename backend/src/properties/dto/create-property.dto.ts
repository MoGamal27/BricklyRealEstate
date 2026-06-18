import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PropertyType } from '../../common/enums';

export class CreatePropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @Type(() => Number)
  @IsInt()
  price: number;

  @Type(() => Number)
  @IsInt()
  bedrooms: number;

  @Type(() => Number)
  @IsInt()
  bathrooms: number;

  @Type(() => Number)
  @IsInt()
  area: number;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  furnished: boolean;

  @Type(() => Number)
  @IsInt()
  level: number;

  @IsNotEmpty()
  compound: string;

  @IsNotEmpty()
  paymentOption: string;

  @IsDateString()
  deliveryDate: Date;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  address: string;

  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  aiPriceSuggested?: number;
}
