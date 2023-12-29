import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateOrderDto } from '../dtos/create.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppDataSource } from 'data-source';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getOrders(): Promise<Order[]> {
    return await AppDataSource.manager.find(Order, {
      select: {
        id: true,
        sapOrderNumber: true,
        productName: true,
        filler: true,
        operator: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const { sapOrderNumber } = orderData;

    const existingOrder: Order = await AppDataSource.manager.findOne(Order, {
      where: { sapOrderNumber },
    });

    if (existingOrder) {
      throw new HttpException(
        'Order with the same SAP order number already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const orderCreated = AppDataSource.manager.create(Order, {
        sapOrderNumber: orderData.sapOrderNumber,
        productName: orderData.productName,
        filler: orderData.filler,
        operator: orderData.operator,
      });

      const order = await AppDataSource.manager.save(orderCreated);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
