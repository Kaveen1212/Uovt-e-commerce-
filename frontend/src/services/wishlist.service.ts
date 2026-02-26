import api from './api';

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  };
  createdAt: string;
}

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    return api.get<WishlistItem[]>('/wishlist');
  },

  async addToWishlist(productId: string): Promise<WishlistItem> {
    return api.post<WishlistItem>('/wishlist', { productId });
  },

  async removeFromWishlist(productId: string): Promise<void> {
    return api.delete<void>(`/wishlist/${productId}`);
  },

  async clearWishlist(): Promise<void> {
    return api.delete<void>('/wishlist');
  },

  async isInWishlist(productId: string): Promise<boolean> {
    return api.get<boolean>(`/wishlist/check/${productId}`);
  },
};
