import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateMoreOrderDetailDto,
  CreateOrderDetailDto,
  DurationFillerDTO,
  UpdateOrderDetailDTO,
} from '../dtos/create-order-detail.dto';
import { OrderDetailService } from './../services/order-detail.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Order detail')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('order-detail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}

  @Post(':idOrder')
  createOrderDetail(
    @Param('idOrder') idOrder: string,
    @Body() CreateOrderDetailDto: CreateOrderDetailDto,
  ) {
    return this.orderDetailService.createDetail(
      idOrder,
      CreateOrderDetailDto,
      false,
    );
  }

  //ADD DURATION SE CREA SERIAL

  @Post('updateDuration/:idOrderDetail')
  generateSerialDetail(
    @Param('idOrderDetail') idOrderDetail: string,
    @Body() durationFiller: DurationFillerDTO,
  ) {
    return this.orderDetailService.updateDuration(
      idOrderDetail,
      durationFiller,
    );
  }

  // DETAILS BY ORDER
  @Get(':idOrder')
  OrderDetailByOrder(@Param('idOrder') idOrder: string) {
    return this.orderDetailService.getOrderDetailLast(idOrder);
  }
  // UPDATE DE NUM TAMBORES
  // @Put('numtambor/:idOrder')
  // UpdateNumTamborByOrder(@Param('idOrder') idOrder: string) {
  //   return this.orderDetailService.updateNumberTambor(idOrder);
  // }

  // UPDATE DE CAMPOS RESTANTES
  @Put('/:idOrderDetail')
  update(
    @Param('idOrderDetail') idOrderDetail: string,
    @Body() orderDetailUpdate: UpdateOrderDetailDTO,
  ) {
    return this.orderDetailService.updateOrderDetail(
      idOrderDetail,
      orderDetailUpdate,
    );
  }

  @Post('/moreOrderDetail/:idOrder')
  createMoreOrderDetail(
    @Param('idOrder') idOrder: string,
    @Body() CreateOrderDetailDto: CreateMoreOrderDetailDto,
  ) {
    return this.orderDetailService.createDetail(
      idOrder,
      null,
      true,
      CreateOrderDetailDto,
    );
  }
}