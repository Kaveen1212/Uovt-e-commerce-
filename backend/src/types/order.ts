import { User } from './user';
import { Product } from './product';

interface ProductOrder {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string; // TypeORM uses 'id', not '_id'
  owner: User;
  totalPrice: number;
  products: ProductOrder[];
  created: Date;
}