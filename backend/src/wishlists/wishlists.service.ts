import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async findAll(userId: string) {
    return await this.wishlistsRepository.find({
      where: { userId },
      relations: ['property', 'property.seller'],
    });
  }

  async addToWishlist(userId: string, propertyId: string) {
    const existing = await this.wishlistsRepository.findOne({
      where: { userId, propertyId },
    });

    if (existing) {
      throw new ConflictException('Property already in wishlist');
    }

    const wishlist = this.wishlistsRepository.create({
      userId,
      propertyId,
    });

    return await this.wishlistsRepository.save(wishlist);
  }

  async removeFromWishlist(userId: string, propertyId: string) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { userId, propertyId },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistsRepository.remove(wishlist);
    return { message: 'Removed from wishlist successfully' };
  }
}
