import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { PropertyType } from '../../common/enums';

export class CreatePropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsInt()
  price: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsInt()
  area: number;

  @IsBoolean()
  furnished: boolean;

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

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsInt()
  aiPriceSuggested?: number;
}
