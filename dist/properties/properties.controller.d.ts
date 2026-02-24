import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(filterDto: FilterPropertyDto): Promise<{
        data: import("./entities/property.entity").Property[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    create(createPropertyDto: CreatePropertyDto, user: any): Promise<import("./entities/property.entity").Property>;
    update(id: string, updatePropertyDto: UpdatePropertyDto, user: any): Promise<import("./entities/property.entity").Property>;
    updateStatus(id: string, updateStatusDto: UpdatePropertyStatusDto): Promise<import("./entities/property.entity").Property>;
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
