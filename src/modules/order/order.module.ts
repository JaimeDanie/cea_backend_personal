import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from '../products/products.module';
import { FillerModule } from '../filler/filler.module';
import { TubularModule } from '../tubular/tubular.module';
import { OperateModule } from '../operate/operate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ProductsModule,
    FillerModule,
    TubularModule,
    OperateModule,
  ],
  controllers: [OrdersController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
