import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateMoreOrderDetailDto,
  CreateOrderDetailDto,
  DurationFillerDTO,
  UpdateFillingOrderDetailDto,
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
  constructor(private orderDetailService: OrderDetailService) { }

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
    return this.orderDetailService.getOrderAndDetail(idOrder);
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
  //PRINT SERIALES CODIGO DE BARRAS
  @Put('/updatePrint/:idOrderDetail')
  printUpdate(@Param('idOrderDetail') idOrderDetail: string) {
    return this.orderDetailService.updatePrint(idOrderDetail);
  }

  //CIERRE DE TURNO POR ORDEN
  @Post('/shiftclosing/:idOrder')
  shiftClosing(@Param('idOrder') idOrder: string) {
    return this.orderDetailService.closingShift(idOrder);
  }

  //ASSIGNED DATE FILLING TO ORDER DETAIL
  @Post('/dateFilling/:idOrderDetail')
  updateDateFilling(
    @Param('idOrderDetail') idOrderDetail: string
  ) {
    return this.orderDetailService.setTimeDateFilling(
      idOrderDetail
    );
  }

  //ASSIGNED DATE FILLING TO ORDER DETAIL
  @Post('/dateFillingHour/:idOrderDetail')
  updateDateFillingHours(
    @Param('idOrderDetail') idOrderDetail: string,
    @Body() updateFilling: UpdateFillingOrderDetailDto
  ) {
    return this.orderDetailService.setTimeDateFilling(
      idOrderDetail,
      updateFilling
    );
  }

  //GET LOTE BY ORDER
  @Get('/lote/:idOrder')
  getLoteByOrder(
    @Param('idOrder') idOrder: string
  ) {
    return this.orderDetailService.getLotesByOrder(
      idOrder
    );
  }

  @Get('/get/all')
  getAllOrderDetail() {
    return this.orderDetailService.getAllOrderDetails()
  }
}
