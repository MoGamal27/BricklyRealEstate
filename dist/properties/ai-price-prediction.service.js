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
var AIPricePredictionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIPricePredictionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const enums_1 = require("../common/enums");
let AIPricePredictionService = AIPricePredictionService_1 = class AIPricePredictionService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(AIPricePredictionService_1.name);
        this.aiApiUrl =
            this.configService.get('AI_API_URL') ||
                'http://localhost:5000/predict';
    }
    mapPropertyType(type) {
        const typeMapping = {
            [enums_1.PropertyType.APARTMENT]: 'Apartment',
            [enums_1.PropertyType.VILLA]: 'Standalone Villa',
            [enums_1.PropertyType.TOWNHOUSE]: 'Town House',
            [enums_1.PropertyType.SINGLE_FAMILY]: 'Standalone Villa',
            [enums_1.PropertyType.CONDO]: 'Apartment',
            [enums_1.PropertyType.DUPLEX]: 'Duplex',
        };
        return typeMapping[type] || 'Apartment';
    }
    formatDeliveryDate(date) {
        const now = new Date();
        const deliveryDate = new Date(date);
        if (deliveryDate <= now) {
            return 'Ready to move';
        }
        return deliveryDate.getFullYear().toString();
    }
    async predictPrice(propertyData) {
        try {
            const requestData = {
                Type: this.mapPropertyType(propertyData.type),
                Bedrooms: propertyData.bedrooms,
                Bathrooms: propertyData.bathrooms,
                Area: propertyData.area,
                Furnished: propertyData.furnished ? 'Yes' : 'No',
                Level: propertyData.level.toString(),
                Compound: propertyData.compound || 'Unknown',
                Payment_Option: propertyData.paymentOption || 'Cash',
                Delivery_Date: this.formatDeliveryDate(propertyData.deliveryDate),
                Delivery_Term: 'Finished',
                City: propertyData.city,
            };
            this.logger.log(`Requesting AI price prediction for property in ${propertyData.city}`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.aiApiUrl, [requestData], {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            }));
            if (response.data.success && response.data.predictions.length > 0) {
                const predictedPrice = Math.round(response.data.predictions[0]);
                this.logger.log(`AI predicted price: ${predictedPrice} EGP`);
                return predictedPrice;
            }
            else {
                this.logger.warn(`AI prediction failed: ${response.data.error || 'Unknown error'}`);
                return null;
            }
        }
        catch (error) {
            this.logger.error(`Error calling AI prediction API: ${error.message}`, error.stack);
            return null;
        }
    }
    async predictPrices(properties) {
        try {
            const requestData = properties.map((prop) => ({
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
            this.logger.log(`Requesting batch AI price prediction for ${properties.length} properties`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.aiApiUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 15000,
            }));
            if (response.data.success) {
                return response.data.predictions.map((price) => Math.round(price));
            }
            else {
                this.logger.warn(`Batch AI prediction failed: ${response.data.error || 'Unknown error'}`);
                return properties.map(() => null);
            }
        }
        catch (error) {
            this.logger.error(`Error calling batch AI prediction API: ${error.message}`, error.stack);
            return properties.map(() => null);
        }
    }
};
exports.AIPricePredictionService = AIPricePredictionService;
exports.AIPricePredictionService = AIPricePredictionService = AIPricePredictionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AIPricePredictionService);
//# sourceMappingURL=ai-price-prediction.service.js.map