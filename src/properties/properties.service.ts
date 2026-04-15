import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UserRole } from '../common/enums';
import { AIPricePredictionService } from './ai-price-prediction.service';

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);

  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private aiPricePredictionService: AIPricePredictionService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, sellerId: string, imageUrls: string[]) {
    // Get AI price suggestion before creating property
    let aiPriceSuggested: number | null = null;

    try {
      this.logger.log('Requesting AI price prediction for new property');
      aiPriceSuggested = await this.aiPricePredictionService.predictPrice({
        type: createPropertyDto.type,
        bedrooms: createPropertyDto.bedrooms,
        bathrooms: createPropertyDto.bathrooms,
        area: createPropertyDto.area,
        furnished: createPropertyDto.furnished,
        level: createPropertyDto.level,
        compound: createPropertyDto.compound,
        paymentOption: createPropertyDto.paymentOption,
        deliveryDate: createPropertyDto.deliveryDate,
        city: createPropertyDto.city,
      });

      if (aiPriceSuggested) {
        this.logger.log(
          `AI suggested price: ${aiPriceSuggested} EGP (User price: ${createPropertyDto.price} EGP)`,
        );
      } else {
        this.logger.warn('AI price prediction returned null');
      }
    } catch (error) {
      this.logger.error(
        `Failed to get AI price prediction: ${error.message}`,
        error.stack,
      );
      // Continue with property creation even if AI prediction fails
    }

    // Create property with AI suggestion
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      sellerId,
      images: imageUrls,
      aiPriceSuggested: aiPriceSuggested || undefined,
    });

    const savedProperty = await this.propertiesRepository.save(property);

    // Return property with AI suggestion info
    return {
      ...savedProperty,
      aiPriceDifference: aiPriceSuggested
        ? savedProperty.price - aiPriceSuggested
        : null,
      aiPriceDifferencePercentage: aiPriceSuggested
        ? ((savedProperty.price - aiPriceSuggested) / aiPriceSuggested) * 100
        : null,
    };
  }

  async findAll(filterDto: FilterPropertyDto) {
    const { page = 1, limit = 10, ...filters } = filterDto;
    const queryBuilder = this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoin('property.seller', 'seller')
      .addSelect(['seller.id', 'seller.email', 'seller.name', 'seller.phone']);

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

  async findOne(id: string) {
    const property = await this.propertiesRepository
      .createQueryBuilder('property')
      .leftJoin('property.seller', 'seller')
      .addSelect(['seller.id', 'seller.email', 'seller.name', 'seller.phone'])
      .where('property.id = :id', { id })
      .getOne();

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    property.views += 1;
    await this.propertiesRepository.save(property);

    return property;
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    userId: string,
    userRole: UserRole,
    imageUrls?: string[],
  ) {
    const property = await this.propertiesRepository.findOne({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.sellerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to update this property',
      );
    }

    Object.assign(property, updatePropertyDto);

    if (imageUrls && imageUrls.length > 0) {
      property.images = imageUrls;
    }

    return await this.propertiesRepository.save(property);
  }

  async updateStatus(id: string, updateStatusDto: UpdatePropertyStatusDto) {
    const property = await this.propertiesRepository.findOne({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    property.status = updateStatusDto.status;
    return await this.propertiesRepository.save(property);
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    const property = await this.propertiesRepository.findOne({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (property.sellerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to delete this property',
      );
    }

    await this.propertiesRepository.remove(property);
    return { message: 'Property deleted successfully' };
  }
}
