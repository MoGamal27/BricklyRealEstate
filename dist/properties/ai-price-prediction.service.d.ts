import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PropertyType } from '../common/enums';
export declare class AIPricePredictionService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly aiApiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    private mapPropertyType;
    private formatDeliveryDate;
    predictPrice(propertyData: {
        type: PropertyType;
        bedrooms: number;
        bathrooms: number;
        area: number;
        furnished: boolean;
        level: number;
        compound: string;
        paymentOption: string;
        deliveryDate: Date;
        city: string;
    }): Promise<number | null>;
    predictPrices(properties: Array<{
        type: PropertyType;
        bedrooms: number;
        bathrooms: number;
        area: number;
        furnished: boolean;
        level: number;
        compound: string;
        paymentOption: string;
        deliveryDate: Date;
        city: string;
    }>): Promise<(number | null)[]>;
}
