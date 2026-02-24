import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { UserRole } from '../common/enums';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto, buyerId: string) {
    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      buyerId,
    });
    return await this.bookingsRepository.save(booking);
  }

  async findAll(userId: string, userRole: UserRole) {
    const queryBuilder = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.property', 'property')
      .leftJoinAndSelect('booking.buyer', 'buyer')
      .leftJoinAndSelect('property.seller', 'seller');

    if (userRole === UserRole.BUYER) {
      queryBuilder.where('booking.buyerId = :userId', { userId });
    } else if (userRole === UserRole.SELLER) {
      queryBuilder.where('property.sellerId = :userId', { userId });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['property', 'buyer', 'property.seller'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (
      userRole !== UserRole.ADMIN &&
      booking.buyerId !== userId &&
      booking.property.sellerId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to view this booking',
      );
    }

    return booking;
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateBookingStatusDto,
    userId: string,
    userRole: UserRole,
  ) {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (
      userRole !== UserRole.ADMIN &&
      booking.buyerId !== userId &&
      booking.property.sellerId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this booking',
      );
    }

    booking.status = updateStatusDto.status;
    return await this.bookingsRepository.save(booking);
  }
}
