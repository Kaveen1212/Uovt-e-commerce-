import api from './api';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentGatewayResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  orderId: string;
  amount?: number;
  paymentMethod: PaymentMethod;
}

export const paymentService = {
  async createPayment(data: CreatePaymentData): Promise<Payment> {
    return api.post<Payment>('/payments', data);
  },

  async processPayment(
    paymentId: string,
    transactionId?: string,
  ): Promise<Payment> {
    return api.patch<Payment>(`/payments/${paymentId}/process`, {
      transactionId,
    });
  },

  async failPayment(paymentId: string, reason?: string): Promise<Payment> {
    return api.patch<Payment>(`/payments/${paymentId}/fail`, { reason });
  },

  async refundPayment(paymentId: string): Promise<Payment> {
    return api.patch<Payment>(`/payments/${paymentId}/refund`, {});
  },

  async getPayment(paymentId: string): Promise<Payment> {
    return api.get<Payment>(`/payments/${paymentId}`);
  },

  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    return api.get<Payment[]>(`/payments/order/${orderId}`);
  },

  async getAllPayments(): Promise<Payment[]> {
    return api.get<Payment[]>('/payments');
  },
};
