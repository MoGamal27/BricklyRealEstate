import { BookingStatus } from '../../common/enums';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
export declare class Booking {
    id: string;
    date: Date;
    time: string;
    status: BookingStatus;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    buyerId: string;
    propertyId: string;
    buyer: User;
    property: Property;
}
