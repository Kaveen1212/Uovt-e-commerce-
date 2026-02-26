export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  image?: string;
  stock?: number;
  category?: string;
  brand?: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;
