import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    findAll(user: any): Promise<import("./entities/booking.entity").Booking[]>;
    findOne(id: string, user: any): Promise<import("./entities/booking.entity").Booking>;
    create(createBookingDto: CreateBookingDto, user: any): Promise<import("./entities/booking.entity").Booking>;
    updateStatus(id: string, updateStatusDto: UpdateBookingStatusDto, user: any): Promise<import("./entities/booking.entity").Booking>;
}
