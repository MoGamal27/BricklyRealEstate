import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PropertyType } from '../common/enums';

interface AIPredictionRequest {
  Type: string;
  Bedrooms: number;
  Bathrooms: number;
  Area: number;
  Furnished: string;
  Level: string;
  Compound: string;
  Payment_Option: string;
  Delivery_Date: string;
  Delivery_Term: string;
  City: string;
}

interface AIPredictionResponse {
  success: boolean;
  predictions: number[];
  count: number;
  error?: string;
}

@Injectable()
export class AIPricePredictionService {
  private readonly logger = new Logger(AIPricePredictionService.name);
  private readonly aiApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Get AI API URL from environment variables
    // Default to localhost for development
    this.aiApiUrl =
      this.configService.get<string>('AI_API_URL') ||
      'http://localhost:5000/predict';
  }

  /**
   * Map PropertyType enum to AI model expected format
   */
  private mapPropertyType(type: PropertyType): string {
    const typeMapping = {
      [PropertyType.APARTMENT]: 'Apartment',
      [PropertyType.VILLA]: 'Standalone Villa',
      [PropertyType.TOWNHOUSE]: 'Town House',
      [PropertyType.SINGLE_FAMILY]: 'Standalone Villa',
      [PropertyType.CONDO]: 'Apartment',
      [PropertyType.DUPLEX]: 'Duplex',
    };

    return typeMapping[type] || 'Apartment';
  }

  /**
   * Format delivery date for AI model
   */
  private formatDeliveryDate(date: Date): string {
    const now = new Date();
    const deliveryDate = new Date(date);

    // If date is in the past or very close, return "Ready to move"
    if (deliveryDate <= now) {
      return 'Ready to move';
    }

    // Return year
    return deliveryDate.getFullYear().toString();
  }

  /**
   * Predict property price using AI model
   */
  async predictPrice(propertyData: {
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
  }): Promise<number | null> {
    try {
      // Prepare request data in the format expected by AI API
      const requestData: AIPredictionRequest = {
        Type: this.mapPropertyType(propertyData.type),
        Bedrooms: propertyData.bedrooms,
        Bathrooms: propertyData.bathrooms,
        Area: propertyData.area,
        Furnished: propertyData.furnished ? 'Yes' : 'No',
        Level: propertyData.level.toString(),
        Compound: propertyData.compound || 'Unknown',
        Payment_Option: propertyData.paymentOption || 'Cash',
        Delivery_Date: this.formatDeliveryDate(propertyData.deliveryDate),
        Delivery_Term: 'Finished', // Default value
        City: propertyData.city,
      };

      this.logger.log(
        `Requesting AI price prediction for property in ${propertyData.city}`,
      );

      // Call AI API
      const response = await firstValueFrom(
        this.httpService.post<AIPredictionResponse>(
          this.aiApiUrl,
          [requestData], // API expects array
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 second timeout
          },
        ),
      );

      if (response.data.success && response.data.predictions.length > 0) {
        const predictedPrice = Math.round(response.data.predictions[0]);
        this.logger.log(`AI predicted price: ${predictedPrice} EGP`);
        return predictedPrice;
      } else {
        this.logger.warn(
          `AI prediction failed: ${response.data.error || 'Unknown error'}`,
        );
        return null;
      }
    } catch (error) {
      this.logger.error(
        `Error calling AI prediction API: ${error.message}`,
        error.stack,
      );
      // Return null instead of throwing error to not block property creation
      return null;
    }
  }

  /**
   * Batch predict prices for multiple properties
   */
  async predictPrices(
    properties: Array<{
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
    }>,
  ): Promise<(number | null)[]> {
    try {
      // Prepare batch request
      const requestData: AIPredictionRequest[] = properties.map((prop) => ({
        Type: this.mapPropertyType(prop.type),
        Bedrooms: prop.bedrooms,
        Bathrooms: prop.bathrooms,
        Area: prop.area,
        Furnished: prop.furnished ? 'Yes' : 'No',
        Level: prop.level.toString(),
        Compound: prop.compound || 'Unknown',
        Payment_Option: prop.paymentOption || 'Cash',
        Delivery_Date: this.formatDeliveryDate(prop.deliveryDate),
        Delivery_Term: 'Finished',
        City: prop.city,
      }));

      this.logger.log(
        `Requesting batch AI price prediction for ${properties.length} properties`,
      );

      const response = await firstValueFrom(
        this.httpService.post<AIPredictionResponse>(
          this.aiApiUrl,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 15000, // 15 second timeout for batch
          },
        ),
      );

      if (response.data.success) {
        return response.data.predictions.map((price) => Math.round(price));
      } else {
        this.logger.warn(
          `Batch AI prediction failed: ${response.data.error || 'Unknown error'}`,
        );
        return properties.map(() => null);
      }
    } catch (error) {
      this.logger.error(
        `Error calling batch AI prediction API: ${error.message}`,
        error.stack,
      );
      return properties.map(() => null);
    }
  }
}
