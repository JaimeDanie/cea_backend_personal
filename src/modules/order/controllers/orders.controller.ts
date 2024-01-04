import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ordenes')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  index(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Post()
  create(@Body() order: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Get('byOrderSap/:numorder')
  getByNumSap(@Param('numorder') numorder: string): Promise<Order> {
    return this.orderService.getOrderSap(numorder);
  }

  @Put(':id')
  updateOredr(
    @Param('id') id: string,
    @Body() order: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, order);
  }
}
