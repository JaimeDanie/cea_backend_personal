import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FillerService } from '../services/filler.service';
import { Filler } from '../entities/filler.entities';
import { FillerDto } from '../dto/filler.dto';

@ApiTags('Llenadora')
@Controller('filler')
export class FillerController {
  constructor(private fillerService: FillerService) {}

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

  // @Put(':id')
  // updateFiller(@Param('id') id: string, @Body() filler: FillerDto) {
  //   return this.fillerService.updateFiller(id, filler);
  // }

  @Delete(':id')
  deleteFiller(@Param('id') id: string) {
    return this.fillerService.deleteFiller(id);
  }
}
