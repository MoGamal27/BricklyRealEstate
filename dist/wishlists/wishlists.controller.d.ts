import { WishlistsService } from './wishlists.service';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    findAll(user: any): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    addToWishlist(user: any, propertyId: string): Promise<import("./entities/wishlist.entity").Wishlist>;
    removeFromWishlist(user: any, propertyId: string): Promise<{
        message: string;
    }>;
}
