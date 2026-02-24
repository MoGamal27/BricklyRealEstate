import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  sellerId: string;

  @IsNotEmpty()
  propertyId: string;
}
