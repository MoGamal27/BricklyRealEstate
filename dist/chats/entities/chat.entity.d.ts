import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
import { Message } from '../../messages/entities/message.entity';
export declare class Chat {
    id: string;
    buyerId: string;
    sellerId: string;
    propertyId: string;
    buyer: User;
    seller: User;
    property: Property;
    messages: Message[];
}
