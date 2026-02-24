import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { UserRole } from '../common/enums';
export declare class BookingsService {
    private bookingsRepository;
    constructor(bookingsRepository: Repository<Booking>);
    create(createBookingDto: CreateBookingDto, buyerId: string): Promise<Booking>;
    findAll(userId: string, userRole: UserRole): Promise<Booking[]>;
    findOne(id: string, userId: string, userRole: UserRole): Promise<Booking>;
    updateStatus(id: string, updateStatusDto: UpdateBookingStatusDto, userId: string, userRole: UserRole): Promise<Booking>;
}
