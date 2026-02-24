import { IsEnum } from 'class-validator';
import { PropertyStatus } from '../../common/enums';

export class UpdatePropertyStatusDto {
  @IsEnum(PropertyStatus)
  status: PropertyStatus;
}
