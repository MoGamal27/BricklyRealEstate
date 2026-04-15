"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const properties_controller_1 = require("./properties.controller");
const properties_service_1 = require("./properties.service");
const ai_price_prediction_service_1 = require("./ai-price-prediction.service");
const property_entity_1 = require("./entities/property.entity");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let PropertiesModule = class PropertiesModule {
};
exports.PropertiesModule = PropertiesModule;
exports.PropertiesModule = PropertiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([property_entity_1.Property]),
            axios_1.HttpModule.register({
                timeout: 10000,
                maxRedirects: 5,
            }),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [properties_controller_1.PropertiesController],
        providers: [properties_service_1.PropertiesService, ai_price_prediction_service_1.AIPricePredictionService],
        exports: [properties_service_1.PropertiesService, ai_price_prediction_service_1.AIPricePredictionService],
    })
], PropertiesModule);
//# sourceMappingURL=properties.module.js.map