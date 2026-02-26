export interface CreateOrderDto {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: string;
  phone?: string;
  notes?: string;
}
