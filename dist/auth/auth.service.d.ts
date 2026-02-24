import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
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
        };
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
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
        };
        access_token: string;
    }>;
    private generateToken;
    refresh(userId: string): Promise<{
        access_token: string;
    }>;
}
