import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('wishlists')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.wishlistsService.findAll(user.id);
  }

  @Post(':propertyId')
  async addToWishlist(
    @CurrentUser() user: any,
    @Param('propertyId') propertyId: string,
  ) {
    return this.wishlistsService.addToWishlist(user.id, propertyId);
  }

  @Delete(':propertyId')
  async removeFromWishlist(
    @CurrentUser() user: any,
    @Param('propertyId') propertyId: string,
  ) {
    return this.wishlistsService.removeFromWishlist(user.id, propertyId);
  }
}
