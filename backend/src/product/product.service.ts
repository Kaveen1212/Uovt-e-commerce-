import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['seller'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { category, isActive: true },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async search(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: [
        { name: Like(`%${query}%`), isActive: true },
        { description: Like(`%${query}%`), isActive: true },
        { category: Like(`%${query}%`), isActive: true },
      ],
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(createProductDto: CreateProductDto, sellerId?: string): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      sellerId,
    });
    return this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock += quantity;
    return this.productRepository.save(product);
  }
}