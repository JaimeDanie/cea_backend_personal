import { NonConformityService } from './../../non-conformity/services/non-conformity.service';
import { FilligCameraService } from './../../filling-camera/services/fillig-camera.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { IsNull, LessThan, Not, Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';
import {
  CreateOrderDetailDto,
  DurationFillerDTO,
  UpdateOrderDetailDTO,
} from '../dtos/create-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly fillingCameraService: FilligCameraService,
    private readonly nonConformityService: NonConformityService,
  ) {}

  // CREAR ORDER DETAILS
  async createDetail(idOrder: string, orderDetail: CreateOrderDetailDto) {
    const existOrder = await this.orderRepository.findOne({
      where: { id: idOrder },
    });
    if (existOrder) {
      const existFillig = await this.fillingCameraService.findByid(
        orderDetail.filligCamera,
      );

      if (existFillig) {
        let savedDetail = 0;
        let noSavedDetail = 0;
        for (let i = 0; i < orderDetail.num_stickers; i++) {
          try {
            const existDetailOrderWithDuration = await this.getOrderDetailLast(
              existOrder.id,
            );
            const numTambor = await this.generateNumTambor(existOrder.id);
            console.log('NUM TAMBOR==>', numTambor[0]);
            const newOrderDetail = await this.orderDetailRepository.save({
              ...orderDetail,
              lote: this.obtainNumLote(
                existDetailOrderWithDuration[
                  existDetailOrderWithDuration.length - 1
                ],
              ).toString(),
              datefilling: i == 0 ? this.formatDateFilling(new Date()) : null,
              filligcamera: existFillig,
              order: existOrder,
              lotebolsa: orderDetail.bolsa,
              numtambor:
                numTambor.length === 0
                  ? 1
                  : numTambor[0].numtambor === 24
                  ? 1
                  : +numTambor[0].numtambor + 1,
              duration:
                existDetailOrderWithDuration.length == 0
                  ? null
                  : existDetailOrderWithDuration[0].duration,
              status_tambor: 'SIN NOVEDAD',
            });
            if (i === 0) {
              newOrderDetail.serial = await this.generateSerial(newOrderDetail);
              delete newOrderDetail['dateFilling'];
              delete newOrderDetail['filligCamera'];
              delete newOrderDetail['num_stickers'];
              delete newOrderDetail['bolsa'];
              this.orderDetailRepository.update(
                newOrderDetail.id,
                newOrderDetail,
              );
            }
            savedDetail++;
          } catch (error) {
            console.log('ERROR===>', error);
            noSavedDetail++;
          }
        }
        return {
          success: true,
          message: `saved ${savedDetail} orders details y no guardadas ${noSavedDetail}`,
        };
      }
    }
    return { success: false, message: 'No created orders details' };
  }

  formatDateFilling(date: Date): string {
    const anio = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const seg = date.getSeconds();

    return (
      anio +
      '-' +
      month.toString().padStart(2, '0') +
      '-' +
      day.toString().padStart(2, '0') +
      ' ' +
      hour.toString().padStart(2, '0') +
      ':' +
      min.toString().padStart(2, '0') +
      ':' +
      seg.toString().padStart(2, '0')
    );
  }

  obtainNumLote(existDetailOrderWithDuration: OrderDetail) {
    return existDetailOrderWithDuration?.numtambor
      ? existDetailOrderWithDuration?.numtambor < 24
        ? existDetailOrderWithDuration.lote
        : +existDetailOrderWithDuration.lote + 1
      : 1;
  }

  //UPDATE DURATION
  async updateDuration(
    orderDetailId: string,
    durationDetail: DurationFillerDTO,
  ) {
    const existOrderDetails = await this.orderDetailRepository.findOne({
      relations: ['order'],
      where: { id: orderDetailId },
    });

    if (!existOrderDetails) {
      return { success: false, message: 'orderDetail no exist' };
    }

    const orderDetailCalculateLLenado = await this.orderDetailRepository.find({
      relations: ['order'],
      where: { order: { id: existOrderDetails.order.id } },
      order: { createdat: 'ASC' },
    });

    if (orderDetailCalculateLLenado.length === 0 && existOrderDetails) {
      existOrderDetails.serial = await this.generateSerial(existOrderDetails);
      await this.orderDetailRepository.update(
        existOrderDetails.id,
        existOrderDetails,
      );
      return { success: true, message: 'duration updated successfully' };
    }
    if (orderDetailCalculateLLenado.length > 0) {
      existOrderDetails.duration = durationDetail.duration.toString();
      existOrderDetails.serial = await this.generateSerial(existOrderDetails);
      await this.orderDetailRepository.update(
        existOrderDetails.id,
        existOrderDetails,
      );
    }

    if (
      orderDetailCalculateLLenado[0].id !== existOrderDetails.id &&
      !orderDetailCalculateLLenado[0].duration
    ) {
      return { success: false, message: 'first order detail not initialize' };
    }
    // CALCULAR POR MEDIO DEL VALOR DE DURACION FECHA/HORA DE LLENADO

    const filterUpdateOrderDetail = orderDetailCalculateLLenado.filter(
      (orderDetail) => orderDetail.createdat > existOrderDetails.createdat,
    );

    for (let orderDetail of filterUpdateOrderDetail) {
      const orderDetailLast = await this.orderDetailRepository.find({
        where: {
          order: { id: existOrderDetails.order.id },
          createdat: LessThan(orderDetail.createdat),
          datefilling: Not(IsNull()),
        },
        order: { createdat: 'ASC' },
      });
      console.log('LAST ORDER DETAIL==>', orderDetailLast);
      orderDetail.datefilling = this.calculateDateFilling(
        durationDetail.duration,
        orderDetailLast[orderDetailLast.length - 1],
      );
      orderDetail.duration = durationDetail.duration.toString();
      orderDetail.serial = await this.generateSerial(orderDetail);
      await this.orderDetailRepository.update(orderDetail.id, orderDetail);
    }

    return {
      success: true,
      message: 'assigned duration succesfully',
    };
  }

  async getOrderDetailLast(idOrder: string) {
    try {
      const details = await this.orderDetailRepository.find({
        relations: ['order'],
        where: { order: { id: idOrder } },
        order: { createdat: 'ASC' },
      });
      return details;
    } catch (error) {
      console.log('ERROR ACA GET ORDER DETAILS==>', error);
    }
  }

  //GENERAR SERIAL
  async generateSerial(orderDetail: OrderDetail) {
    const dateData = new Date(orderDetail.datefilling);
    return (
      dateData.getFullYear().toString() +
      (dateData.getMonth() + 1).toString().padStart(2, '0') +
      dateData.getDate().toString().padStart(2, '0') +
      orderDetail.order.numorder.toString() +
      orderDetail.lote.toString() +
      orderDetail.numtambor
    );
  }

  calculateDateFilling(seconds: number, orderDetail: OrderDetail) {
    const dateFilling = orderDetail.datefilling
      ? new Date(orderDetail.datefilling)
      : new Date();
    const newDate = new Date(
      dateFilling.setSeconds(dateFilling.getSeconds() + seconds),
    );
    return this.formatDateFilling(newDate);
  }

  //GENERAR NUMERO DE TAMBOR
  async generateNumTambor(idOrder: string) {
    const details = await this.orderDetailRepository.find({
      where: { order: { id: idOrder } },
      order: { createdat: 'DESC' },
    });
    return details;
  }

  //ACTUALIZAR NUMERO DE TAMBOR
  async updateNumberTambor(idOrder: string) {
    try {
      const ordersDetail = await this.orderDetailRepository.find({
        relations: ['order'],
        where: { order: { id: idOrder } },
      });
      console.log('DETAILS==>', ordersDetail);
      if (ordersDetail.length > 0) {
        try {
          for (let order of ordersDetail) {
            if (!order.numtambor) {
              const numTambor = await this.generateNumTambor(idOrder);
              if (numTambor.length > 0) {
                order.numtambor = numTambor[0].numtambor + 1;
                await this.orderDetailRepository.update(order.id, order);
              } else {
                order.numtambor = 1;
                await this.orderDetailRepository.update(order.id, order);
              }
            }
          }
        } catch (error) {
          console.log('ERROR==>', error);
        }
      }
    } catch (error) {
      console.log('ERROR==>', error);
    }
  }

  // ACTUALIZAR DATOS DESPUES DE HABER GENERADO SERIAL O ETIQUETA
  async updateOrderDetail(
    idOrderDetail: string,
    updateOrderDetail: UpdateOrderDetailDTO,
  ) {
    const orderDetail = await this.getByIdOrderDetail(idOrderDetail);

    if (!orderDetail) {
      return { success: false, mesage: 'order detail not found' };
    }

    const nonConformityRestriction = await this.nonConformityService.getById(
      updateOrderDetail.nonConformity,
    );

    if (!nonConformityRestriction) {
      return { success: false, mesage: 'status no allowed' };
    }

    orderDetail.sello = Number(updateOrderDetail.sello);
    orderDetail.weight = Number(updateOrderDetail.weight);
    orderDetail.status = nonConformityRestriction;

    const upgradeOrderDetail = await this.orderDetailRepository.update(
      orderDetail.id,
      orderDetail,
    );
    return { success: true, data: orderDetail };
  }

  //ORDER DETAIL BY ID
  async getByIdOrderDetail(id: string) {
    return await this.orderDetailRepository.findOne({
      where: { id },
    });
  }
}
