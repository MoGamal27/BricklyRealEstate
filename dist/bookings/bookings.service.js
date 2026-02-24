"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const enums_1 = require("../common/enums");
let BookingsService = class BookingsService {
    constructor(bookingsRepository) {
        this.bookingsRepository = bookingsRepository;
    }
    async create(createBookingDto, buyerId) {
        const booking = this.bookingsRepository.create({
            ...createBookingDto,
            buyerId,
        });
        return await this.bookingsRepository.save(booking);
    }
    async findAll(userId, userRole) {
        const queryBuilder = this.bookingsRepository
            .createQueryBuilder('booking')
            .leftJoinAndSelect('booking.property', 'property')
            .leftJoinAndSelect('booking.buyer', 'buyer')
            .leftJoinAndSelect('property.seller', 'seller');
        if (userRole === enums_1.UserRole.BUYER) {
            queryBuilder.where('booking.buyerId = :userId', { userId });
        }
        else if (userRole === enums_1.UserRole.SELLER) {
            queryBuilder.where('property.sellerId = :userId', { userId });
        }
        return await queryBuilder.getMany();
    }
    async findOne(id, userId, userRole) {
        const booking = await this.bookingsRepository.findOne({
            where: { id },
            relations: ['property', 'buyer', 'property.seller'],
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== enums_1.UserRole.ADMIN &&
            booking.buyerId !== userId &&
            booking.property.sellerId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view this booking');
        }
        return booking;
    }
    async updateStatus(id, updateStatusDto, userId, userRole) {
        const booking = await this.bookingsRepository.findOne({
            where: { id },
            relations: ['property'],
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (userRole !== enums_1.UserRole.ADMIN &&
            booking.buyerId !== userId &&
            booking.property.sellerId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this booking');
        }
        booking.status = updateStatusDto.status;
        return await this.bookingsRepository.save(booking);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map