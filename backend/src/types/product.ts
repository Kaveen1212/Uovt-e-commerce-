import { User } from './user';

export interface Product {
  id?: string;
  owner: User | string;
  title: string;
  image: string;
  description: string;
  price: number;
  created: Date;
}