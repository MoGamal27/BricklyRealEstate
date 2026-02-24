import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistsService {
    private wishlistsRepository;
    constructor(wishlistsRepository: Repository<Wishlist>);
    findAll(userId: string): Promise<Wishlist[]>;
    addToWishlist(userId: string, propertyId: string): Promise<Wishlist>;
    removeFromWishlist(userId: string, propertyId: string): Promise<{
        message: string;
    }>;
}
