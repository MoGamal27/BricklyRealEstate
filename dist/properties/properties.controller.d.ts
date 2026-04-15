import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class PropertiesController {
    private readonly propertiesService;
    private readonly cloudinaryService;
    constructor(propertiesService: PropertiesService, cloudinaryService: CloudinaryService);
    findAll(filterDto: FilterPropertyDto): Promise<{
        data: import("./entities/property.entity").Property[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    create(createPropertyDto: CreatePropertyDto, user: any, files: Express.Multer.File[]): Promise<{
        aiPriceDifference: number;
        aiPriceDifferencePercentage: number;
        id: string;
        title: string;
        description: string;
        status: import("../common/enums").PropertyStatus;
        type: import("../common/enums").PropertyType;
        price: number;
        bedrooms: number;
        bathrooms: number;
        area: number;
        furnished: boolean;
        level: number;
        compound: string;
        paymentOption: string;
        deliveryDate: Date;
        city: string;
        neighborhood: string;
        address: string;
        latitude: number;
        longitude: number;
        images: string[];
        aiPriceSuggested: number;
        views: number;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        seller: import("../users/entities/user.entity").User;
        wishlists: import("../wishlists/entities/wishlist.entity").Wishlist[];
        bookings: import("../bookings/entities/booking.entity").Booking[];
        chats: import("../chats/entities/chat.entity").Chat[];
    }>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, user: any, files: Express.Multer.File[]): Promise<import("./entities/property.entity").Property>;
    updateStatus(id: string, updateStatusDto: UpdatePropertyStatusDto): Promise<import("./entities/property.entity").Property>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
