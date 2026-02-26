import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { User } from './user/user.entity';
import { Product } from './product/product.entity';
import { Cart } from './cart/cart.entity';
import { Wishlist } from './wishlist/wishlist.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './order/order-item.entity';
import { Payment } from './payment/payment.entity';

@Module({
  imports: [
    // This loads your .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // This connects to PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'e-commerce',
      entities: [User, Product, Cart, Wishlist, Order, OrderItem, Payment],
      synchronize: true,
      ssl: false,
      extra: {
        max: 10,
        connectionTimeoutMillis: 10000,
      },
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CartModule,
    WishlistModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}