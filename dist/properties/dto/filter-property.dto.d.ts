import { PropertyType, PropertyStatus } from '../../common/enums';
export declare class FilterPropertyDto {
    type?: PropertyType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    furnished?: boolean;
    city?: string;
    neighborhood?: string;
    page?: number;
    limit?: number;
}
