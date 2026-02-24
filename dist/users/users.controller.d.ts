import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/enums';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }>;
    updateProfile(user: any, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
