import { FillingCamera } from './../../filling-camera/entities/filling-camera.entity';
import { NonConformityService } from './../../non-conformity/services/non-conformity.service';
import { FilligCameraService } from './../../filling-camera/services/fillig-camera.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { IsNull, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';
import {
  CreateMoreOrderDetailDto,
  CreateOrderDetailDto,
  DurationFillerDTO,
  UpdateFillingOrderDetailDto,
  UpdateOrderDetailDTO,
} from '../dtos/create-order-detail.dto';
import { NonConformityEnum } from 'src/modules/non-conformity/dtos/non-conformity.dto';
import { OrderConfigService } from './order-config.service';
import { Lote } from '../entities/lote.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
    private readonly fillingCameraService: FilligCameraService,
    private readonly nonConformityService: NonConformityService,
    private readonly orderConfigService: OrderConfigService
  ) { }
  formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Bogota',
  });

  // CREAR ORDER DETAILS
  async createDetail(
    idOrder: string,
    orderDetail: CreateOrderDetailDto,
    created = false,
    orderDetailMore: CreateMoreOrderDetailDto = null,
  ) {
    const existOrder = await this.orderRepository.findOne({
      where: { id: idOrder },
      relations: ['product'],
    });
    if (existOrder) {
      if (existOrder.shiftclosing === 1) {
        return { success: false, message: 'order closing no created' };
      }
      let existFillig = null;
      //INSERTAR CONFIG INICIAL
      const existDetails = await this.getOrderDetailTotal();
      if (!created) {
        existFillig = await this.fillingCameraService.findByid(
          orderDetail.filligCamera,
        );
      } else {
        const orderDetailFirst = await this.getFirstOrderDetailLast(
          existOrder.id,
        );
        if (orderDetailFirst.length === 0) {
          return { success: false, message: 'No order details found' };
        }
        orderDetail = new CreateOrderDetailDto();
        existFillig = orderDetailFirst[0].filligcamera;
        orderDetail.bolsa = orderDetailFirst[0].lotebolsa;
        orderDetail.filligCamera = orderDetailFirst[0].filligcamera.id;
      }

      if (existFillig) {
        let savedDetail = 0;
        let noSavedDetail = 0;
        const num_stickers = !created
          ? orderDetail.num_stickers
          : orderDetailMore.num_stickers;
        for (let i = 0; i < num_stickers; i++) {
          try {
            const existDetailOrderWithDuration = await this.getOrderDetailLast(
              existOrder.id,
            );
            const newOrderDetail = await this.orderDetailRepository.save({
              ...orderDetail,
              lote: (
                await this.obtainNumLote(
                  existDetailOrderWithDuration[
                  existDetailOrderWithDuration.length - 1
                  ],
                  existOrder,
                  existDetails,
                )
              ).toString(),
              datefilling: null,
              filligcamera: await this.obtainFilligCamera(created, existFillig, i),
              order: existOrder,
              lotebolsa: orderDetail.bolsa,
              numtambor: await this.obtainTambor(),
              duration:
                existDetailOrderWithDuration.length == 0
                  ? null
                  : existDetailOrderWithDuration[existDetailOrderWithDuration.length - 1].duration,
              status: await this.nonConformityService.getByName({
                name: NonConformityEnum.IN_PROCESS,
              }),
            });

            newOrderDetail.serial = await this.generateSerial(newOrderDetail);
            delete newOrderDetail['dateFilling'];
            delete newOrderDetail['filligCamera'];
            delete newOrderDetail['num_stickers'];
            delete newOrderDetail['bolsa'];
            this.orderDetailRepository.update(
              newOrderDetail.id,
              newOrderDetail,
            );

            if (created) {
              const orderDetailLastToDate = await this.getOrderDetailLastToDate(
                existOrder.id,
                newOrderDetail,
              );

              if (orderDetailLastToDate.length > 0) {
                newOrderDetail.weight =
                  orderDetailLastToDate[orderDetailLastToDate.length - 1]
                    .weight || null;
                this.orderDetailRepository.update(
                  newOrderDetail.id,
                  newOrderDetail,
                );
              }
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

    const newDate =
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
      seg.toString().padStart(2, '0');
    return newDate;
  }

  //OBTENER CAMARA DE LLENADO
  async obtainFilligCamera(created: boolean, existFillig: FillingCamera, i: number) {
    if (!created) {
      return i == 0 || i % 2 === 0 ? existFillig : await this.fillingCameraService.otherCameraByName(existFillig.name)
    }
    return i == 0 || i % 2 === 0 ? this.fillingCameraService.otherCameraByName(existFillig.name) : existFillig
  }

  // FUNCIONALIDAD DE UNICO LOTE
  async obtainNumLote(
    existDetailOrderWithDuration: OrderDetail,
    existOrder: Order,
    orderDetails: OrderDetail[],
  ) {
    const numLoteTotal = await this.obtainLote(orderDetails);
    const numLoteOrder = await this.obtainLoteByOrder(existOrder.id);
    const loteCount = await this.obtainCountByLote(numLoteOrder.toString());
    if (!existDetailOrderWithDuration) {
      await this.createLote(+numLoteTotal + 1)
      return +numLoteTotal + 1;
    }
    if (
      existOrder.product.code !==
      existDetailOrderWithDuration.order.product.code &&
      loteCount == Number(existOrder.product.characteristiclote)
    ) {
      await this.createLote(+numLoteTotal + 1)
      return +numLoteTotal + 1;
    } else if (
      existOrder.product.code ===
      existDetailOrderWithDuration.order.product.code
    ) {
      if (loteCount < Number(existOrder.product.characteristiclote)) {
        await this.createLote(+numLoteOrder)
        return numLoteOrder;
      } else {
        await this.createLote(+numLoteOrder + 1)
        return +numLoteOrder + 1;
      }
    }
  }

  async obtainCountByLote(lote: string) {
    const obtainCountLote = await this.orderDetailRepository.find({
      where: { lote },
    });
    return obtainCountLote.length;
  }
  //GENERAR NUMERO DE TAMBOR UNICO
  async obtainTambor() {
    const obtainNewNumberTambor = await this.orderDetailRepository
      .createQueryBuilder('orderdetail')
      .select('MAX(orderdetail.numtambor)', 'max')
      .getRawOne();

    return obtainNewNumberTambor.max + 1;
  }
  //GENERAR NUMERO DE LOTE UNICO
  async obtainLote(orderDetails: OrderDetail[]) {
    const obtainNewNumberLote = await this.orderDetailRepository
      .createQueryBuilder('orderdetail')
      .select('MAX(orderdetail.lote)', 'max')
      .getRawOne();

    let newLote = 0;
    if (orderDetails.length === 0) {
      newLote =
        +(await this.orderConfigService.getCurrentLote()).data.loteinitial - 1;
    } else {
      newLote = obtainNewNumberLote.max;
    }

    return newLote;
  }

  //OBTENER LOTES POR ORDEN
  async obtainLoteByOrder(idOrder: string) {
    const obtainNewNumberLote = await this.orderDetailRepository.find({
      where: { order: { id: idOrder } },
      order: { lote: 'DESC' },
    });

    return +obtainNewNumberLote.length > 0 ? obtainNewNumberLote[0].lote : 1;
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
    if (existOrderDetails.order.shiftclosing === 1) {
      return { success: false, message: 'order closing no updated' };
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
      //existOrderDetails.serial = await this.generateSerial(existOrderDetails);
      await this.orderDetailRepository.update(
        existOrderDetails.id,
        existOrderDetails,
      );
    }

    if (
      orderDetailCalculateLLenado[0].id !== existOrderDetails.id &&
      !orderDetailCalculateLLenado[0].duration
    ) {
      for (let orderDetail of orderDetailCalculateLLenado) {
        orderDetail.duration = durationDetail.duration.toString();
        // orderDetail.serial = await this.generateSerial(orderDetail);
        await this.orderDetailRepository.update(orderDetail.id, orderDetail);
        return {
          success: true,
          message: 'assigned duration succesfully',
        };
      }
    }
    // CALCULAR POR MEDIO DEL VALOR DE DURACION FECHA/HORA DE LLENADO

    const filterUpdateOrderDetail = orderDetailCalculateLLenado.filter(
      (orderDetail) => orderDetail.createdat > existOrderDetails.createdat,
    );

    for (let orderDetail of filterUpdateOrderDetail) {
      orderDetail.duration = durationDetail.duration.toString();
      // orderDetail.serial = await this.generateSerial(orderDetail);
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
        relations: ['order', 'status', 'order.product'],
        where: { order: { id: idOrder } },
        order: { createdat: 'ASC' },
      });
      return details;
    } catch (error) {
      console.log('ERROR ACA GET ORDER DETAILS==>', error);
    }
  }

  async getOrderDetailTotal() {
    try {
      const details = await this.orderDetailRepository.find({
        order: { createdat: 'ASC' },
      });
      return details;
    } catch (error) {
      console.log('ERROR ACA GET ORDER DETAILS==>', error);
    }
  }

  async getOrderDetailLastToDate(
    idOrder: string,
    orderDetail: OrderDetail,
  ): Promise<OrderDetail[]> {
    const orderDetailLast = await this.orderDetailRepository.find({
      where: {
        order: { id: idOrder },
        createdat: LessThan(orderDetail.createdat),
        datefilling: Not(IsNull()),
      },
      order: { createdat: 'ASC' },
    });
    return orderDetailLast;
  }
  //OBTENER DETAILS SUPERIORES A LA FECHA
  async getOrderDetailAfterToDate(
    idOrder: string,
    orderDetail: OrderDetail,
  ): Promise<OrderDetail[]> {
    const orderDetailLast = await this.orderDetailRepository.find({
      where: {
        order: { id: idOrder },
        createdat: MoreThan(orderDetail.createdat),
      },
      order: { createdat: 'ASC' },
    });
    return orderDetailLast;
  }

  //OBTENER ORDER DETAIL CON RELACIONES
  async getFirstOrderDetailLast(idOrder: string) {
    try {
      const details = await this.orderDetailRepository.find({
        relations: ['order', 'filligcamera', 'status'],
        where: { order: { id: idOrder } },
      });
      return details;
    } catch (error) {
      console.log('ERROR ACA GET ORDER DETAILS==>', error);
    }
  }

  //GENERAR SERIAL
  async generateSerial(orderDetail: OrderDetail) {
    const orderShiftClosing = await this.obtainOrderShiftClosing();
    let availableSeriales = [];
    if (orderShiftClosing.length > 0) {
      availableSeriales = await this.obtainSerialesAvailable(orderShiftClosing, orderDetail.order);
    }
    if (availableSeriales.length > 0) {
      return availableSeriales[0];
    }
    const dateData = new Date(orderDetail.createdat);
    return (
      dateData.getFullYear().toString() +
      orderDetail.numtambor.toString().padStart(6, '0')
    );
  }

  // CALCULAR FECHA DE LLENADO
  calculateDateFilling(seconds: number, orderDetail: OrderDetail) {
    const dateFilling = orderDetail.datefilling
      ? new Date(orderDetail.datefilling)
      : new Date(this.formatter.format(new Date()));
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
    if (orderDetail.order.shiftclosing === 1) {
      return { success: false, message: 'order closing no updated' };
    }

    let nonConformityRestriction = null;
    if (updateOrderDetail.nonConformity) {
      nonConformityRestriction = await this.nonConformityService.getById(
        updateOrderDetail.nonConformity,
      );

      if (!nonConformityRestriction) {
        return { success: false, mesage: 'status no allowed' };
      }
    }

    orderDetail.novedad = updateOrderDetail.novedad
      ? updateOrderDetail.novedad
      : orderDetail.novedad
        ? orderDetail.novedad
        : null;

    orderDetail.sello = updateOrderDetail.sello
      ? updateOrderDetail.sello
      : orderDetail.sello
        ? orderDetail.sello
        : null;
    orderDetail.status = nonConformityRestriction
      ? nonConformityRestriction
      : orderDetail.status
        ? orderDetail.status
        : null;
    if (orderDetail.sello || orderDetail.status || orderDetail.novedad) {
      await this.orderDetailRepository.update(orderDetail.id, orderDetail);
    }

    if (updateOrderDetail.weight) {
      //UPDATE WEIGHT ORDER DETAILS
      const ordersToUpdateWeight = await this.getFirstOrderDetailLast(
        orderDetail.order.id,
      );

      if (ordersToUpdateWeight.length > 0) {
        if (
          ordersToUpdateWeight.filter((orderD) => !orderD.weight).length ==
          ordersToUpdateWeight.length
        ) {
          for (let orderDet of ordersToUpdateWeight) {
            orderDet.weight = Number(updateOrderDetail.weight);
            await this.orderDetailRepository.update(orderDet.id, orderDet);
          }
        } else {
          const dataAfter = await this.getOrderDetailAfterToDate(
            orderDetail.order.id,
            orderDetail,
          );
          if (dataAfter.length > 0) {
            orderDetail.weight = Number(updateOrderDetail.weight);
            await this.orderDetailRepository.update(
              orderDetail.id,
              orderDetail,
            );
            for (let orderDet of dataAfter) {
              orderDet.weight = Number(updateOrderDetail.weight);
              await this.orderDetailRepository.update(orderDet.id, orderDet);
            }
          }
        }
      }
    }

    if (updateOrderDetail.lotebolsa) {
      //UPDATE LOTE BOLSA ORDER DETAILS
      const ordersToUpdateWeight = await this.getFirstOrderDetailLast(
        orderDetail.order.id,
      );

      if (ordersToUpdateWeight.length > 0) {
        if (
          ordersToUpdateWeight.filter((orderD) => !orderD.lotebolsa).length ==
          ordersToUpdateWeight.length
        ) {
          for (let orderDet of ordersToUpdateWeight) {
            orderDet.lotebolsa = updateOrderDetail.lotebolsa;
            await this.orderDetailRepository.update(orderDet.id, orderDet);
          }
        } else {
          const dataAfter = await this.getOrderDetailAfterToDate(
            orderDetail.order.id,
            orderDetail,
          );
          if (dataAfter.length > 0) {
            orderDetail.lotebolsa = updateOrderDetail.lotebolsa;
            await this.orderDetailRepository.update(
              orderDetail.id,
              orderDetail,
            );
            for (let orderDet of dataAfter) {
              orderDet.lotebolsa = updateOrderDetail.lotebolsa;
              await this.orderDetailRepository.update(orderDet.id, orderDet);
            }
          }
        }
      }
    }

    return { success: true, data: orderDetail };
  }

  //ORDER DETAIL BY ID
  async getByIdOrderDetail(id: string) {
    return await this.orderDetailRepository.findOne({
      relations: ['order', 'status'],
      where: { id },
    });
  }

  async updatePrint(id: string) {
    const orderDetail = await this.getByIdOrderDetail(id);
    if (orderDetail) {
      if (orderDetail.order.shiftclosing === 1) {
        return { success: false, message: 'order closing, no updated print' };
      }

      orderDetail.print = 1;
      await this.orderDetailRepository.update(id, orderDetail);
      return { success: true, data: orderDetail };
    } else {
      return { success: false, message: 'no updated order detail print' };
    }
  }

  async closingShift(idOrder: string) {
    const existOrder = await this.orderRepository.findOne({
      where: { id: idOrder },
    });
    if (!existOrder) {
      return { success: false, message: 'Order not found' };
    }
    const orderDetails = await this.getOrderDetailLast(idOrder);
    if (orderDetails.length == 0) {
      return { success: false, message: 'Order details not founds' };
    }

    const orderDetailsNoFinish = [];

    orderDetails.map((orderDetail) => {
      let orderDetalValid = {};
      orderDetalValid['id'] = orderDetail.id;
      // orderDetalValid['datefilling'] = !orderDetail.datefilling ? false : true;

      orderDetalValid['duration'] = !orderDetail.duration ? false : true;

      //orderDetalValid['sello'] = !orderDetail.sello && orderDetail.status.name !== NonConformityEnum.IN_PROCESS ? false : true;

      orderDetalValid['bolsa'] = !orderDetail.lotebolsa ? false : true;

      orderDetalValid['weight'] = !orderDetail.weight ? false : true;

      if (
        Object.values(orderDetalValid).filter((valid) => valid === false)
          .length > 0
      ) {
        orderDetailsNoFinish.push(orderDetalValid);
      }
    });
    if (orderDetailsNoFinish.length === 0) {
      existOrder.shiftclosing = 1;
      await this.orderRepository.update(existOrder.id, existOrder);
      return { success: true, message: 'shift closing successfully' };
    } else {
      return {
        success: false,
        message: 'shift closing error',
        data: orderDetailsNoFinish,
      };
    }
  }

  async obtainOrderShiftClosing() {
    const orderShiftClosing = await this.orderRepository.find({
      where: { shiftclosing: 1 },
      order: { createdAt: 'ASC' },
    });
    return orderShiftClosing;
  }

  async obtainSerialesAvailable(ordersShiftClosing: Order[], orderActual: Order) {
    const serialesAvailable = [];
    for (let order of ordersShiftClosing) {
      const ordeDetailByOrder = await this.getOrderDetailsOrderByCreatedAt(
        order.id,
      );
      if (ordeDetailByOrder.length > 0) {
        for (let orderDetail of ordeDetailByOrder) {
          const available = await this.obtainSerialReutilizado(
            orderDetail.serial,
            orderActual
          );
          if (available) {
            //console.log('SERIAL NO REUTILIZADO', orderDetail.serial);
            serialesAvailable.push(orderDetail.serial);
          }
        }
      }
    }
    // console.log('SERIALES DISPONIBLES==>', serialesAvailable);
    return serialesAvailable;
  }

  async obtainSerialReutilizado(serial: string, orderActual: Order) {
    const existSerialAvailable = await this.orderDetailRepository.find({
      relations: ['status', 'order'],
      where: {
        serial: serial,
        order: { shiftclosing: 1 },
        status: { name: NonConformityEnum.IN_PROCESS },
      },
    });

    const existSerialInOrder = await this.orderDetailRepository.find({
      relations: ['status', 'order'],
      where: {
        serial: serial,
        order: { shiftclosing: 0 },
      },
    });

    const existSerialCerrado = await this.orderDetailRepository.find({
      relations: ['status', 'order'],
      where: {
        serial: serial,
        order: { shiftclosing: 1 },
        status: { name: Not(NonConformityEnum.IN_PROCESS) },
      },
    });

    // console.log('EN ORDEN ABIERTA==>', existSerialInOrder.length);
    //console.log('EN ORDEN CERRADA==>', existSerialAvailable.length);
    // console.log('------------------------------------------------');
    //console.log("TIME ACTUAL==>", orderActual.createdAt.getTime(), "---- TIME ORDER SERIAL==>", orderSerial?.createdAt?.getTime())
    //console.log("SE PUEDE USAR==>", orderActual?.createdAt?.getTime() > orderSerial?.createdAt?.getTime())
    const isValidSerial = existSerialAvailable.length > 0 ? existSerialAvailable.filter((order) => orderActual.createdAt.getTime() > order.order.createdAt.getTime()).length > 0 : false
    return (
      existSerialAvailable.length > 0 &&
      existSerialInOrder.length === 0 &&
      existSerialCerrado.length === 0 && isValidSerial
    );
  }

  //TOMA DE TIEMPO DE LLENADO
  async setTimeDateFilling(idOrderDetail: string, updateFilling?: UpdateFillingOrderDetailDto) {
    try {
      const existOrderDetail = await this.orderDetailRepository.findOne({ where: { id: idOrderDetail } })

      if (!existOrderDetail) {
        return { sucess: false, message: "order detail not found" }
      }

      const statusConForme = await this.nonConformityService.getByName({ name: NonConformityEnum.CONFORME })
      if (!updateFilling) {
        existOrderDetail.datefilling = existOrderDetail.datefilling ? existOrderDetail.datefilling :
          this.formatDateFilling(
            new Date(this.formatter.format(new Date())),
          )
      } else {
        const newDate = new Date()
        const splitHours = updateFilling.hours.split(':')
        newDate.setHours(parseFloat(splitHours[0]))
        newDate.setMinutes(parseFloat(splitHours[1]))
        newDate.setSeconds(parseFloat(splitHours[2]))
        existOrderDetail.datefilling = existOrderDetail.datefilling ? existOrderDetail.datefilling :
          this.formatDateFilling(new Date(this.formatter.format(newDate)))
      }

      existOrderDetail.status = statusConForme

      await this.orderDetailRepository.update(existOrderDetail.id, existOrderDetail)

      return { sucess: true, message: "assigned dateFilling succesfully" }

    } catch (error) {
      return { sucess: false, message: "exception to assigned dateFilling" }
    }
  }

  //TOMA DE TIEMPO DE LLENADO
  async getLotesByOrder(idorder: string) {
    try {
      const existOrder = await this.orderRepository.findOne({ where: { id: idorder } })

      if (!existOrder) {
        return { sucess: false, message: "order not found" }
      }

      const lotes = await this.orderDetailRepository.createQueryBuilder("orderdetail").
        where("orderdetail.order = :idorder", { idorder })
        .select('lote').distinct().getRawMany();
      // DESACTIVAR CUANDO SE LIMPIE LA DATA
      await Promise.all(lotes.map(async (lote) => {
        await this.createLote(lote.lote)
      }))

      return { sucess: true, data: lotes }

    } catch (error) {
      console.log("EXCEPTION==>", error)
      return { sucess: false, message: "exception to get lotes" }
    }
  }

  //OBTENER ORDER DETAIL CON RELACIONES
  async getOrderDetailsOrderByCreatedAt(idOrder: string) {
    try {
      const details = await this.orderDetailRepository.find({
        relations: { order: true },
        where: {
          order: { id: idOrder },
          status: { name: NonConformityEnum.IN_PROCESS },
        },
        order: { createdat: 'ASC' },
      });
      return details;
    } catch (error) {
      console.log('ERROR ACA GET ORDER DETAILS==>', error);
    }
  }

  async getOrderAndDetail(idOrder: string) {
    try {
      const orderData = await this.orderRepository.findOne({
        relations: ['product'],
        where: { id: idOrder },
      });
      if (!orderData) {
        return { success: false, message: 'order not found' };
      }

      if (orderData?.shiftclosing === 0) {

        const details = await this.orderDetailRepository.find({
          relations: ['status', 'filligcamera'],
          where: { order: { id: idOrder } },
          order: { createdat: 'ASC' },
        });
        return { success: true, order: orderData, details };
      }

      if (orderData?.shiftclosing === 1) {
        return await this.getOrderAndDetailClosing(orderData)
      }
    } catch (error) {
      return { success: false, message: 'order not found.' };
    }
  }

  async getOrderAndDetailClosing(orderData: Order) {
    try {

      if (orderData) {
        const details = await this.orderDetailRepository.find({
          relations: ['status', 'filligcamera'],
          where: { order: { id: orderData.id }, status: { name: Not(NonConformityEnum.IN_PROCESS) } },
          order: { createdat: 'ASC' },
        });
        return { success: true, order: orderData, details };
      } else {
        return { success: false, message: 'order not found' };
      }
    } catch (error) {
      return { success: false, message: 'order not found.' };
    }
  }

  async createLote(numlote: number) {
    const existLote = await this.loteRepository.findOne({ where: { numlote } })
    if (!existLote) {
      await this.loteRepository.save({ numlote })
    }
    return true;
  }

  async getAllOrderDetails() {
    const details = await this.orderDetailRepository.find({
      relations: ['order', 'status', 'filligcamera'],
      where: { order: { shiftclosing: 0 } },
      order: { createdat: 'ASC' },
    });
    return { success: true, data: details };
  }

  async getLotesGnal() {
    try {
      const existOrder = await this.orderRepository.find({ relations: ["product"] })

      if (existOrder.length === 0) {
        return { sucess: false, message: "No existen órdenes" }
      }
      let resultLotes = []
      await Promise.all(existOrder.map(async (orden) => {
        const idorder = orden.id
        const lotes = await this.orderDetailRepository.createQueryBuilder("orderdetail").
          where("orderdetail.order = :idorder", { idorder })
          .select('lote').distinct().getRawMany();
        if (lotes.length > 0) {
          await Promise.all(lotes.map(async (lote) => {
            const quatityTambores = await this.orderDetailRepository.find({ where: { lote: lote.lote } })
            resultLotes.push({ orderSap: orden.saporder, lote: lote.lote, product: orden.product.name, quantity: quatityTambores.length })
          }))
        }
      }))
      resultLotes = resultLotes.sort((a, b) => Number(a.lote) - Number(b.lote))
      return { sucess: true, data: resultLotes }

    } catch (error) {
      console.log("EXCEPTION==>", error)
      return { sucess: false, message: "exception to get lotes" }
    }
  }

}
