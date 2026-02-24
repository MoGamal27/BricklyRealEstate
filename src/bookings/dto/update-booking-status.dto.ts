import { IsEnum } from 'class-validator';
import { BookingStatus } from '../../common/enums';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
