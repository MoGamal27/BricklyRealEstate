import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UserRole } from '../common/enums';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, sellerId: string) {
    const property = this.propertiesRepository.create({
      ...createPropertyDto,
      sellerId,
    });
    return await this.propertiesRepository.save(property);
  }

  async findAll(filterDto: FilterPropertyDto) {
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

  async findOne(id: string) {
    const property = await this.propertiesRepository.findOne({
      where: { id },
      relations: ['seller'],
    });

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
