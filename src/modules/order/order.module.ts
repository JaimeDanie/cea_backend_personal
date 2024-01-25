import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from '../products/products.module';
import { FillerModule } from '../filler/filler.module';
import { TubularModule } from '../tubular/tubular.module';
import { OperateModule } from '../operate/operate.module';
import { OrderDetailController } from './controllers/order-detail.controller';
import { OrderDetailService } from './services/order-detail.service';
import { FillingCameraModule } from '../filling-camera/filling-camera.module';
import { OrderDetail } from './entities/order-detail.entity';
import { NonConformityModule } from '../non-conformity/non-conformity.module';
import { AuthModule } from '../auth/auth.module';

import { OrderConfigService } from './services/order-config.service';
import { OrderConfigController } from './controllers/order-config.controller';
import { OrderConfig } from './entities/order-config-lote.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Order, OrderDetail, OrderConfig]),
    ProductsModule,
    FillerModule,
    TubularModule,
    OperateModule,
    FillingCameraModule,
    NonConformityModule,
  ],
  controllers: [OrdersController, OrderDetailController, OrderConfigController],
  providers: [OrderService, OrderDetailService, OrderConfigService],
  exports: [OrderService],
})
export class OrderModule {}
