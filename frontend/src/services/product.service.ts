import api from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return api.get<Product[]>('/products');
  },

  async getProductById(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    return api.post<Product>('/products', data);
  },

  async updateProduct(id: string, data: Partial<CreateProductData>): Promise<Product> {
    return api.put<Product>(`/products/${id}`, data);
  },

  async deleteProduct(id: string): Promise<void> {
    return api.delete<void>(`/products/${id}`);
  },

  async searchProducts(query: string): Promise<Product[]> {
    return api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return api.get<Product[]>(`/products/category/${category}`);
  },
};
