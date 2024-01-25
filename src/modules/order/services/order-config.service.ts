import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderConfig } from '../entities/order-config-lote.entity';
import { Repository } from 'typeorm';
import { OrderConfigDto } from '../dtos/create-order-config.dto';

@Injectable()
export class OrderConfigService {
  constructor(
    @InjectRepository(OrderConfig)
    private readonly orderConfigRepository: Repository<OrderConfig>,
  ) {}

  async getCurrentLote() {
    const dataConfig = await this.orderConfigRepository.find({});
    if (dataConfig.length > 0) {
      let configYear = null;
      dataConfig.forEach((data) => {
        if (this.isValidConfigYear(data)) {
          configYear = data;
        }
      });

      if (configYear) {
        return { success: true, data: configYear };
      } else {
        return { success: false, message: 'Not config lote this year' };
      }
    } else {
      return { success: false, message: 'Not config lote' };
    }
  }

  async saveConfig(orderConfig: OrderConfigDto) {
    const ordersConfig = await this.orderConfigRepository.find({});
    if (ordersConfig.length > 0) {
      let configYear = null;
      ordersConfig.forEach((data) => {
        if (this.isValidConfigYear(data)) {
          configYear = data;
        }
      });

      if (!configYear) {
        const config = await this.orderConfigRepository.save({
          loteinitial: orderConfig.numlote,
        });
        return { success: true, data: config };
      } else {
        return { success: false, message: 'data configured in this year' };
      }
    } else {
      const config = await this.orderConfigRepository.save({
        loteinitial: orderConfig.numlote,
      });
      return { success: true, data: config };
    }
  }

  getAllConfig() {
    return this.orderConfigRepository.find({});
  }

  isValidConfigYear(data: any) {
    const now = new Date();
    return data.createdat.getFullYear() === now.getFullYear();
  }
}
