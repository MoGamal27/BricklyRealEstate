import { UserRole } from '../../common/enums';
import { Property } from '../../properties/entities/property.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Message } from '../../messages/entities/message.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    properties: Property[];
    wishlists: Wishlist[];
    bookings: Booking[];
    messages: Message[];
}
