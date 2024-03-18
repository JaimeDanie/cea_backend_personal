import { OperateService } from './../../operate/services/operate.service';
import { FillerService } from './../../filler/services/filler.service';
import { ProductService } from './../../products/services/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/create.dto';
import { Injectable } from '@nestjs/common';
import { TubularService } from 'src/modules/tubular/services/tubular.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private productService: ProductService,
    private fillerService: FillerService,
    private operatorService: OperateService,
    private tubularService: TubularService,
  ) { }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: { filler: true, operate: true, product: true, tubular: true },
    });
  }

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { filler: true, operate: true, product: true, tubular: true },
    });
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const existingOrder: Order = await this.orderRepository.findOne({
      where: { saporder: orderData.saporder },
    });

    if (existingOrder) {
      console.log('EXIST SAP ORDER');
      return null;
    }

    const product = await this.productService.getProduct(orderData.product);
    if (!product) {
      console.log('NO EXIST PRODUCT');
      return null;
    }
    const filler = await this.fillerService.getFiller(orderData.filler);

    if (!filler) {
      console.log('NO EXIST FILLER');
      return null;
    }
    const operate = await this.operatorService.getOne(orderData.operate);
    if (!operate) {
      console.log('NO EXIST OPERATE');
      return null;
    }

    const supervisor = await this.operatorService.getOne(orderData.supervisor);
    if (!supervisor) {
      console.log('NO EXIST OPERATE');
      return null;
    }
    const tubular = await this.tubularService.getById(orderData.tubular);
    if (!tubular) {
      console.log('NO EXIST TUBULAR');
      return null;
    }

    const newOrder = {
      ...orderData,
      tubular,
      product,
      filler,
      operate,
      numorder: await this.generateNumOrder(),
      supervisor
    };

    return this.orderRepository.save(newOrder);
  }

  async getOrderSap(numsap: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { saporder: numsap },
      relations: { filler: true, operate: true, product: true, tubular: true },
    });
  }

  async updateOrder(
    idOrder: string,
    orderData: CreateOrderDto,
  ): Promise<Order> {
    const existingOrder: Order = await this.orderRepository.findOne({
      where: { saporder: orderData.saporder },
    });

    const existingOrderUpdate: Order = await this.orderRepository.findOne({
      where: { id: idOrder },
    });

    if (!existingOrderUpdate) {
      return null;
    }

    if (existingOrder.id != idOrder) {
      console.log('EXIST SAP ORDER');
      return null;
    }

    const product = await this.productService.getProduct(orderData.product);
    if (!product) {
      console.log('NO EXIST PRODUCT');
      return null;
    }
    const filler = await this.fillerService.getFiller(orderData.filler);

    if (!filler) {
      console.log('NO EXIST FILLER');
      return null;
    }
    const operate = await this.operatorService.getOne(orderData.operate);
    if (!operate) {
      console.log('NO EXIST OPERATE');
      return null;
    }

    const supervisor = await this.operatorService.getOne(orderData.supervisor);
    if (!supervisor) {
      console.log('NO EXIST SUPERVISOR');
      return null;
    }
    const tubular = await this.tubularService.getById(orderData.tubular);
    if (!tubular) {
      console.log('NO EXIST TUBULAR');
      return null;
    }

    const newOrder = {
      ...orderData,
      tubular,
      product,
      filler,
      operate,
      supervisor
    };

    await this.orderRepository.update(idOrder, newOrder);
    return this.getOrder(idOrder);
  }

  async updateNumberOrder() {
    const orders = await this.orderRepository.find({});
    if (orders.length > 0) {
      try {
        for (let order of orders) {
          if (!order.numorder) {
            const numOrder = await this.generateNumOrder();
            if (numOrder) {
              order.numorder = numOrder + 1;
              await this.orderRepository.update(order.id, order);
            } else {
              order.numorder = 1;
              await this.orderRepository.update(order.id, order);
            }
          }
        }
      } catch (error) {
        console.log('ERROR==>', error);
      }
    }
  }

  async generateNumOrder() {
    const ordersQuery = this.orderRepository
      .createQueryBuilder('orders')
      .select('MAX(orders.numorder)', 'max');
    const numorder = await ordersQuery.getRawOne();
    return numorder.max + 1;
  }

  async getDetailsByProduct(codeProduct: string) {
    return this.orderRepository.find({
      relations: ['product'],
      where: { product: { code: codeProduct } },
    });
  }
}
