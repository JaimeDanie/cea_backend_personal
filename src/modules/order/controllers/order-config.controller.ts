import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderConfigService } from '../services/order-config.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderConfigDto } from '../dtos/create-order-config.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Orderconfig')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('order-config')
export class OrderConfigController {
  constructor(private orderConfigService: OrderConfigService) {}

  @Get('/this-year')
  getConfigThisYear() {
    return this.orderConfigService.getCurrentLote();
  }

  @Post()
  createConfig(@Body() orderConfig: OrderConfigDto) {
    return this.orderConfigService.saveConfig(orderConfig);
  }

  @Get()
  getAll() {
    return this.orderConfigService.getAllConfig();
  }
}
