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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("./entities/property.entity");
const enums_1 = require("../common/enums");
let PropertiesService = class PropertiesService {
    constructor(propertiesRepository) {
        this.propertiesRepository = propertiesRepository;
    }
    async create(createPropertyDto, sellerId) {
        const property = this.propertiesRepository.create({
            ...createPropertyDto,
            sellerId,
        });
        return await this.propertiesRepository.save(property);
    }
    async findAll(filterDto) {
        const { page = 1, limit = 10, ...filters } = filterDto;
        const queryBuilder = this.propertiesRepository
            .createQueryBuilder('property')
            .leftJoinAndSelect('property.seller', 'seller');
        if (filters.type) {
            queryBuilder.andWhere('property.type = :type', { type: filters.type });
        }
        if (filters.status) {
            queryBuilder.andWhere('property.status = :status', {
                status: filters.status,
            });
        }
        if (filters.minPrice) {
            queryBuilder.andWhere('property.price >= :minPrice', {
                minPrice: filters.minPrice,
            });
        }
        if (filters.maxPrice) {
            queryBuilder.andWhere('property.price <= :maxPrice', {
                maxPrice: filters.maxPrice,
            });
        }
        if (filters.bedrooms) {
            queryBuilder.andWhere('property.bedrooms = :bedrooms', {
                bedrooms: filters.bedrooms,
            });
        }
        if (filters.bathrooms) {
            queryBuilder.andWhere('property.bathrooms = :bathrooms', {
                bathrooms: filters.bathrooms,
            });
        }
        if (filters.furnished !== undefined) {
            queryBuilder.andWhere('property.furnished = :furnished', {
                furnished: filters.furnished,
            });
        }
        if (filters.city) {
            queryBuilder.andWhere('property.city = :city', { city: filters.city });
        }
        if (filters.neighborhood) {
            queryBuilder.andWhere('property.neighborhood = :neighborhood', {
                neighborhood: filters.neighborhood,
            });
        }
        const [properties, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: properties,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const property = await this.propertiesRepository.findOne({
            where: { id },
            relations: ['seller'],
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        property.views += 1;
        await this.propertiesRepository.save(property);
        return property;
    }
    async update(id, updatePropertyDto, userId, userRole) {
        const property = await this.propertiesRepository.findOne({
            where: { id },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.sellerId !== userId && userRole !== enums_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to update this property');
        }
        Object.assign(property, updatePropertyDto);
        return await this.propertiesRepository.save(property);
    }
    async updateStatus(id, updateStatusDto) {
        const property = await this.propertiesRepository.findOne({
            where: { id },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        property.status = updateStatusDto.status;
        return await this.propertiesRepository.save(property);
    }
    async remove(id, userId, userRole) {
        const property = await this.propertiesRepository.findOne({
            where: { id },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
        }
        if (property.sellerId !== userId && userRole !== enums_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('You do not have permission to delete this property');
        }
        await this.propertiesRepository.remove(property);
        return { message: 'Property deleted successfully' };
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map