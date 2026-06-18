import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsOptional()
  notes?: string;

  @IsNotEmpty()
  propertyId: string;
}
