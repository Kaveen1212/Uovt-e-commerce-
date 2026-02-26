import api from './api';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: OrderItem[];
  shippingAddress?: string;
}

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<Order> {
    return api.post<Order>('/orders', data);
  },

  async getMyOrders(): Promise<Order[]> {
    return api.get<Order[]>('/orders/my');
  },

  async getOrderById(id: string): Promise<Order> {
    return api.get<Order>(`/orders/${id}`);
  },

  async cancelOrder(id: string): Promise<Order> {
    return api.patch<Order>(`/orders/${id}/cancel`, {});
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    return api.patch<Order>(`/orders/${id}/status`, { status });
  },
};
