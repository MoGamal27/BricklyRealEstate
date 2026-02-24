import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(user: any): Promise<{
        access_token: string;
    }>;
}
