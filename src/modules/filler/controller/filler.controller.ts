import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FillerService } from '../services/filler.service';
import { Filler } from '../entities/filler.entities';
import { FillerDto } from '../dto/filler.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Llenadora')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('filler')
export class FillerController {
  constructor(private fillerService: FillerService) { }

  @Get()
  getFillers(): Promise<Filler[]> {
    return this.fillerService.getFillers();
  }

  @Get(':id')
  getFiller(@Param('id') id: string): Promise<Filler> {
    return this.fillerService.getFiller(id);
  }

  @Post()
  createFiller(@Body() filler: FillerDto): Promise<Filler> {
    return this.fillerService.createFiller(filler);
  }

  @Put(':id')
  updateFiller(@Param('id') id: string, @Body() filler: FillerDto) {
    return this.fillerService.updateFiller(id, filler);
  }

  @Delete(':id')
  deleteFiller(@Param('id') id: string) {
    return this.fillerService.deleteFiller(id);
  }
}
