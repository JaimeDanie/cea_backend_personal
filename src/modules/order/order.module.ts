import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]) ],
  controllers: [ 
    OrdersController,
  ],
  providers: [
    OrderService,
  ],
  exports: [
    OrderService,
  ],
})
export class OrderModule {}
