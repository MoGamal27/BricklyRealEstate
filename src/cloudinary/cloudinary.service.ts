import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No images provided');
    }

    if (files.length > 10) {
      throw new BadRequestException('Maximum 10 images allowed');
    }

    const uploadPromises = files.map((file) => this.uploadSingle(file));
    return Promise.all(uploadPromises);
  }

  private uploadSingle(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'brickly/properties',
            transformation: [
              { width: 1280, height: 720, crop: 'limit' },
              { quality: 'auto' },
              { fetch_format: 'auto' },
            ],
          },
          (error, result: UploadApiResponse) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const publicId = this.extractPublicId(imageUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  async deleteImages(imageUrls: string[]): Promise<void> {
    await Promise.all(imageUrls.map((url) => this.deleteImage(url)));
  }

  private extractPublicId(url: string): string | null {
    try {
      // Extract public_id from cloudinary URL
      // e.g. https://res.cloudinary.com/cloud/image/upload/v123/brickly/properties/abc.jpg
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }
}
