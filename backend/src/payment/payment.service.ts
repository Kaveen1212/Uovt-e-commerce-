import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus, PaymentMethod } from './payment.entity';
import { CreatePaymentDto } from './payment.dto';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../order/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private orderService: OrderService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, paymentMethod, amount } = createPaymentDto;

    const order = await this.orderService.findOne(orderId);

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Cannot pay for cancelled order');
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        orderId,
        status: PaymentStatus.COMPLETED,
      },
    });

    if (existingPayment) {
      throw new BadRequestException('Order has already been paid');
    }

    const payment = this.paymentRepository.create({
      orderId,
      amount: amount || order.totalAmount,
      paymentMethod,
      status: PaymentStatus.PENDING,
    });

    return this.paymentRepository.save(payment);
  }

  async processPayment(paymentId: string, transactionId?: string): Promise<Payment> {
    const payment = await this.findOne(paymentId);

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestException('Payment already completed');
    }

    payment.status = PaymentStatus.COMPLETED;
    payment.transactionId = transactionId || `TXN-${Date.now()}`;

    const updatedPayment = await this.paymentRepository.save(payment);

    await this.orderService.updateStatus(
      payment.orderId,
      OrderStatus.PROCESSING,
    );

    return updatedPayment;
  }

  async failPayment(paymentId: string, reason?: string): Promise<Payment> {
    const payment = await this.findOne(paymentId);

    payment.status = PaymentStatus.FAILED;
    payment.paymentGatewayResponse = reason;

    return this.paymentRepository.save(payment);
  }

  async refundPayment(paymentId: string): Promise<Payment> {
    const payment = await this.findOne(paymentId);

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Can only refund completed payments');
    }

    payment.status = PaymentStatus.REFUNDED;

    const refundedPayment = await this.paymentRepository.save(payment);

    await this.orderService.updateStatus(
      payment.orderId,
      OrderStatus.CANCELLED,
    );

    return refundedPayment;
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: ['order', 'order.user'],
      order: { createdAt: 'DESC' },
    });
  }
}
