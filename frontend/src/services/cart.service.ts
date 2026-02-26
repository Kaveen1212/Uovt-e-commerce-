import api from './api';

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    stock: number;
  };
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    return api.get<CartItem[]>('/cart');
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem> {
    return api.post<CartItem>('/cart', { productId, quantity });
  },

  async updateCartItem(productId: string, quantity: number): Promise<CartItem> {
    return api.put<CartItem>(`/cart/${productId}`, { quantity });
  },

  async removeFromCart(productId: string): Promise<void> {
    return api.delete<void>(`/cart/${productId}`);
  },

  async clearCart(): Promise<void> {
    return api.delete<void>('/cart');
  },
};
