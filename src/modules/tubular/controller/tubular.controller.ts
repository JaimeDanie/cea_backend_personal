import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TubularService } from '../services/tubular.service';
import { Tubular } from '../entities/tubular.entity';
import { TubularDto } from '../dtos/tubular.dto';

@ApiTags('Tubular')
@Controller('tubular')
export class TubularController {
  constructor(private tubularService: TubularService) {}

  @Get()
  getAllTubular(): Promise<Tubular[]> {
    return this.tubularService.getAll();
  }

  @Post()
  createTubular(@Body() tubular: TubularDto): Promise<Tubular> {
    return this.tubularService.createTubular(tubular);
  }
}
