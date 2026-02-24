import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../common/enums").UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../common/enums").UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("../common/enums").UserRole;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        properties: import("../properties/entities/property.entity").Property[];
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        messages: import("../messages/entities/message.entity").Message[];
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
