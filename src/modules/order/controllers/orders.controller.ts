import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { Order } from "../entities/order.entity";
import { CreateOrderDto} from "../dtos/create.dto";


@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService){}

  @Get()
  index(): Promise<Order[]> {
    return this.orderService.getOrders()
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrder(id)
  }

  @Post()
  create(@Body() order: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(order)
  }
}