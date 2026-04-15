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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadImages(files) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No images provided');
        }
        if (files.length > 10) {
            throw new common_1.BadRequestException('Maximum 10 images allowed');
        }
        const uploadPromises = files.map((file) => this.uploadSingle(file));
        return Promise.all(uploadPromises);
    }
    uploadSingle(file) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({
                folder: 'brickly/properties',
                transformation: [
                    { width: 1280, height: 720, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' },
                ],
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result.secure_url);
            })
                .end(file.buffer);
        });
    }
    async deleteImage(imageUrl) {
        const publicId = this.extractPublicId(imageUrl);
        if (publicId) {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
    }
    async deleteImages(imageUrls) {
        await Promise.all(imageUrls.map((url) => this.deleteImage(url)));
    }
    extractPublicId(url) {
        try {
            const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
            return match ? match[1] : null;
        }
        catch {
            return null;
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map