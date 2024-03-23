import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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
  constructor(private tubularService: TubularService) { }

  @Get()
  getAllTubular(): Promise<Tubular[]> {
    return this.tubularService.getAll();
  }

  @Get(":id")
  async getOneTubular(@Param('id') id: string) {
    const tubullar = await this.tubularService.getById(id);
    if (tubullar) {
      return { success: true, data: tubullar }
    }
    return { success: false, message: "tubular no existe" }
  }

  @Post()
  createTubular(@Body() tubular: TubularDto) {
    return this.tubularService.createTubular(tubular);
  }

  @Put(":id")
  updateTubular(@Param('id') id: string, @Body() tubular: TubularDto) {
    return this.tubularService.updateTubular(id, tubular)
  }

  @Delete(":id")
  deleteTubular(@Param('id') id: string) {
    return this.tubularService.deleteTubular(id)
  }
}
