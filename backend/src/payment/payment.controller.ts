import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Patch(':id/process')
  processPayment(
    @Param('id') id: string,
    @Body() body: { transactionId?: string },
  ) {
    return this.paymentService.processPayment(id, body.transactionId);
  }

  @Patch(':id/fail')
  failPayment(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.paymentService.failPayment(id, body.reason);
  }

  @Patch(':id/refund')
  refundPayment(@Param('id') id: string) {
    return this.paymentService.refundPayment(id);
  }

  @Get(':id')
  getPayment(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Get('order/:orderId')
  getPaymentsByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrder(orderId);
  }

  @Get()
  getAllPayments() {
    return this.paymentService.findAll();
  }
}
