import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UserRole } from '../common/enums';
export declare class PropertiesService {
    private propertiesRepository;
    constructor(propertiesRepository: Repository<Property>);
    create(createPropertyDto: CreatePropertyDto, sellerId: string): Promise<Property>;
    findAll(filterDto: FilterPropertyDto): Promise<{
        data: Property[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Property>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, userId: string, userRole: UserRole): Promise<Property>;
    updateStatus(id: string, updateStatusDto: UpdatePropertyStatusDto): Promise<Property>;
    remove(id: string, userId: string, userRole: UserRole): Promise<{
        message: string;
    }>;
}
