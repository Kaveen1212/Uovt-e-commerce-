import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../utilities/user.decorator';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@User() user: any) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post()
  addToWishlist(@Body() body: { productId: string }, @User() user: any) {
    return this.wishlistService.addToWishlist(user.id, body.productId);
  }

  @Delete(':productId')
  removeFromWishlist(
    @Param('productId') productId: string,
    @User() user: any,
  ) {
    return this.wishlistService.removeFromWishlist(user.id, productId);
  }

  @Delete()
  clearWishlist(@User() user: any) {
    return this.wishlistService.clearWishlist(user.id);
  }

  @Get('check/:productId')
  checkInWishlist(@Param('productId') productId: string, @User() user: any) {
    return this.wishlistService.isInWishlist(user.id, productId);
  }
}
