import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './order.dto';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const { items, shippingAddress, phone, notes } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = await this.productService.findOne(item.productId);

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${product.name}`,
        );
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      const orderItem = this.orderItemRepository.create({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });

      orderItems.push(orderItem);

      await this.productService.updateStock(product.id, -item.quantity);
    }

    const order = this.orderRepository.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      phone,
      notes,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    await this.cartService.clearCart(userId);

    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product', 'payments'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product', 'payments'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  async cancelOrder(id: string, userId: string): Promise<Order> {
    const order = await this.findOne(id);

    if (order.userId !== userId) {
      throw new BadRequestException('You can only cancel your own orders');
    }

    if (
      order.status === OrderStatus.SHIPPED ||
      order.status === OrderStatus.DELIVERED
    ) {
      throw new BadRequestException('Cannot cancel shipped or delivered orders');
    }

    for (const item of order.items) {
      await this.productService.updateStock(item.productId, item.quantity);
    }

    order.status = OrderStatus.CANCELLED;
    return this.orderRepository.save(order);
  }
}