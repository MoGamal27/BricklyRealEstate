import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
export declare class Wishlist {
    id: string;
    createdAt: Date;
    userId: string;
    propertyId: string;
    user: User;
    property: Property;
}
