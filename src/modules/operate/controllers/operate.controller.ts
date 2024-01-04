import { OperateDto } from './../dtos/operate.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OperateService } from '../services/operate.service';
import { Operate } from '../entities/operate.entity';

@ApiTags('Operadores')
@Controller('operate')
export class OperateController {
  constructor(private operateService: OperateService) {}

  @Get()
  getAll(): Promise<Operate[]> {
    return this.operateService.getAll();
  }

  @Post()
  createOperate(@Body() operateDto: OperateDto): Promise<Operate> {
    return this.operateService.create(operateDto);
  }
}
