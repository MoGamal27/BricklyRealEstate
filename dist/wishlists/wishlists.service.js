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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistsService = class WishlistsService {
    constructor(wishlistsRepository) {
        this.wishlistsRepository = wishlistsRepository;
    }
    async findAll(userId) {
        return await this.wishlistsRepository.find({
            where: { userId },
            relations: ['property', 'property.seller'],
        });
    }
    async addToWishlist(userId, propertyId) {
        const existing = await this.wishlistsRepository.findOne({
            where: { userId, propertyId },
        });
        if (existing) {
            throw new common_1.ConflictException('Property already in wishlist');
        }
        const wishlist = this.wishlistsRepository.create({
            userId,
            propertyId,
        });
        return await this.wishlistsRepository.save(wishlist);
    }
    async removeFromWishlist(userId, propertyId) {
        const wishlist = await this.wishlistsRepository.findOne({
            where: { userId, propertyId },
        });
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist item not found');
        }
        await this.wishlistsRepository.remove(wishlist);
        return { message: 'Removed from wishlist successfully' };
    }
};
exports.WishlistsService = WishlistsService;
exports.WishlistsService = WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishlistsService);
//# sourceMappingURL=wishlists.service.js.map