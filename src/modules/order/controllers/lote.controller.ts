import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderConfigDto } from '../dtos/create-order-config.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { LoteService } from '../services/lote.service';
import { UpdateLoteDto } from '../dtos/lote-update.dto';

@ApiTags('Lote')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('lote')
export class LoteController {
    constructor(private loteService: LoteService) { }

    @Get('/:id')
    getLoteById(@Param('id') id: number) {
        return this.loteService.getById(id);
    }

    @Get()
    getAll() {
        return this.loteService.getAll();
    }

    @Put('/:id')
    updateLote(@Param('id') id: number, @Body() lote: UpdateLoteDto) {
        return this.loteService.updateLote(id, lote)
    }
}
