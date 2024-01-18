import { OperateDto } from './../dtos/operate.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OperateService } from '../services/operate.service';
import { Operate } from '../entities/operate.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Operadores')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
