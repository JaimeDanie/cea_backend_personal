import { Module, forwardRef } from '@nestjs/common';
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
import { Lote } from './entities/lote.entity';
import { LoteController } from './controllers/lote.controller';
import { LoteService } from './services/lote.service';
import { ShiftController } from './controllers/shift.controller';
import { ShiftService } from './services/shift.service';
import { Shift } from './entities/shift.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Order, OrderDetail, OrderConfig, Lote, Shift]),
    forwardRef(() => ProductsModule),
    FillerModule,
    TubularModule,
    OperateModule,
    FillingCameraModule,
    NonConformityModule,
  ],
  controllers: [OrdersController, OrderDetailController, OrderConfigController, LoteController, ShiftController],
  providers: [OrderService, OrderDetailService, OrderConfigService, LoteService, ShiftService],
  exports: [OrderService],
})
export class OrderModule { }
