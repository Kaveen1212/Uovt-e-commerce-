import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../utilities/user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@User() user: any) {
    return this.cartService.getCartItems(user.id);
  }

  @Post()
  addToCart(
    @Body() body: { productId: string; quantity?: number },
    @User() user: any,
  ) {
    return this.cartService.addToCart(user.id, body.productId, body.quantity);
  }

  @Put(':productId')
  updateCart(
    @Param('productId') productId: string,
    @Body() body: { quantity: number },
    @User() user: any,
  ) {
    return this.cartService.updateCartItem(user.id, productId, body.quantity);
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: string, @User() user: any) {
    return this.cartService.removeFromCart(user.id, productId);
  }

  @Delete()
  clearCart(@User() user: any) {
    return this.cartService.clearCart(user.id);
  }
}
