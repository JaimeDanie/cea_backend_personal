import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TubularService } from '../services/tubular.service';
import { Tubular } from '../entities/tubular.entity';
import { TubularDto } from '../dtos/tubular.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Tubular')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
