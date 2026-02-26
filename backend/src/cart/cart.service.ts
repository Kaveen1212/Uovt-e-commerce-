import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private productService: ProductService,
  ) {}

  async getCartItems(userId: string): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { userId },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async addToCart(
    userId: string,
    productId: string,
    quantity: number = 1,
  ): Promise<Cart> {
    await this.productService.findOne(productId);

    const existingItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepository.save(existingItem);
    }

    const cartItem = this.cartRepository.create({
      userId,
      productId,
      quantity,
    });

    return this.cartRepository.save(cartItem);
  }

  async updateCartItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: string, productId: string): Promise<void> {
    const cartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cartItem);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
