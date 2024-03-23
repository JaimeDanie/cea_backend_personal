import { OperateService } from './../../operate/services/operate.service';
import { FillerService } from './../../filler/services/filler.service';
import { ProductService } from './../../products/services/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/create.dto';
import { Injectable } from '@nestjs/common';
import { TubularService } from 'src/modules/tubular/services/tubular.service';
import { Shift } from '../entities/shift.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private productService: ProductService,
    private fillerService: FillerService,
    private operatorService: OperateService,
    private tubularService: TubularService,
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) { }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: { filler: true, operate: true, product: true, tubular: true, supervisor: true, turno: true },
    });
  }

  async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { filler: true, operate: true, product: true, tubular: true, supervisor: true, turno: true },
    });
  }

  async createOrder(orderData: CreateOrderDto) {
    try {
      const existingOrder: Order = await this.orderRepository.findOne({
        where: { saporder: orderData.saporder },
      });

      if (existingOrder) {
        console.log('EXIST SAP ORDER');
        return null;
      }

      const product = await this.productService.getProduct(orderData.product);
      if (!product.success) {
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
      let turno = null

      if (orderData.turno) {
        turno = await this.shiftRepository.findOne({ where: { id: orderData.turno } })
        if (!turno) {
          console.log('NO EXIST TRUNO');
          return null;
        }
      }


      const newOrder = {
        ...orderData,
        tubular,
        product: product.data,
        filler,
        operate,
        numorder: await this.generateNumOrder(),
        supervisor,
        turno
      };

      const dataorder = await this.orderRepository.save(newOrder);
      return { success: true, data: dataorder }
    } catch (error) {
      return { success: false, message: "Error al guardar orden" }
    }
  }

  async getOrderSap(numsap: string) {
    try {
      const data = await this.orderRepository.findOne({
        where: { saporder: numsap },
        relations: { filler: true, operate: true, product: true, tubular: true },
      });
      return { success: true, data }
    } catch (error) {
      return { success: false, message: "No existe orden" }
    }
  }

  async updateOrder(
    idOrder: string,
    orderData: CreateOrderDto,
  ) {
    try {


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
      if (!product.success) {
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

      let turno = null
      console.log("TURNO==>", orderData.turno)
      if (orderData.turno) {
        turno = await this.shiftRepository.findOne({ where: { id: orderData.turno } })
        if (!turno) {
          console.log('NO EXIST TRUNO');
          return null;
        }
      }

      const newOrder = {
        ...orderData,
        tubular,
        product: product.data,
        filler,
        operate,
        supervisor,
        turno
      };

      await this.orderRepository.update(idOrder, newOrder);
      const orderUpdated = await this.getOrder(idOrder);
      return { success: true, data: orderUpdated }
    } catch (error) {
      return { success: false, message: "Orden no actualizada" }
    }
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
