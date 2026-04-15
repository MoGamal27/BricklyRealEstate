import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadImages(files: Express.Multer.File[]): Promise<string[]>;
    private uploadSingle;
    deleteImage(imageUrl: string): Promise<void>;
    deleteImages(imageUrls: string[]): Promise<void>;
    private extractPublicId;
}
