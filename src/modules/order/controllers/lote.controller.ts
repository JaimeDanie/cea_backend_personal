import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { LoteService } from '../services/lote.service';
import { UpdateLoteDto } from '../dtos/lote-update.dto';
import { LoteDto } from '../dtos/lote.dto';

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

    @Put('/information/:id')
    updateLoteInformation(@Param('id') id: number, @Body() lote: LoteDto) {
        return this.loteService.updateLoteInformation(id, lote)
    }
}
