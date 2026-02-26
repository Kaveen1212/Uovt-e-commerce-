import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { OrderStatus } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../utilities/user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @User() user: any) {
    return this.orderService.createOrder(user.id, createOrderDto);
  }

  @Get('my')
  getMyOrders(@User() user: any) {
    return this.orderService.findByUser(user.id);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string, @User() user: any) {
    return this.orderService.cancelOrder(id, user.id);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus },
  ) {
    return this.orderService.updateStatus(id, body.status);
  }

  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }
}