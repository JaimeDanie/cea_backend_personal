import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UpdateLoteDto } from '../dtos/lote-update.dto';
import { ShiftService } from '../services/shift.service';
import { ShiftDto } from '../dtos/shift.dto';

@ApiTags('Turno')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('turno')
export class ShiftController {
    constructor(private shiftService: ShiftService) { }

    @Get()
    getAll() {
        return this.shiftService.getAll();
    }

    @Post('')
    createShift(@Body() shift: ShiftDto) {
        return this.shiftService.createShift(shift)
    }

    @Get('/:id')
    async getShiftById(@Param('id') id: string) {
        return this.shiftService.getById(id);
    }

    @Put('/:id')
    updateShift(@Param('id') id: string, @Body() lote: ShiftDto) {
        return this.shiftService.updateShift(id, lote)
    }

    @Delete('/:id')
    deleteShift(@Param('id') id: string) {
        return this.shiftService.deleteShift(id)
    }


}