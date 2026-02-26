import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private productService: ProductService,
  ) {}

  async getWishlist(userId: string): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      where: { userId },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    await this.productService.findOne(productId);

    const existingItem = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      throw new ConflictException('Product already in wishlist');
    }

    const wishlistItem = this.wishlistRepository.create({
      userId,
      productId,
    });

    return this.wishlistRepository.save(wishlistItem);
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistRepository.remove(wishlistItem);
  }

  async clearWishlist(userId: string): Promise<void> {
    await this.wishlistRepository.delete({ userId });
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const count = await this.wishlistRepository.count({
      where: { userId, productId },
    });
    return count > 0;
  }
}
