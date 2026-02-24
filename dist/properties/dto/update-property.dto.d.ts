import { PropertyType } from '../../common/enums';
export declare class UpdatePropertyDto {
    title?: string;
    description?: string;
    type?: PropertyType;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    furnished?: boolean;
    level?: number;
    compound?: string;
    paymentOption?: string;
    deliveryDate?: Date;
    city?: string;
    neighborhood?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    aiPriceSuggested?: number;
}
