import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLoteDto } from '../dtos/lote-update.dto';
import { Shift } from '../entities/shift.entity';
import { ShiftDto } from '../dtos/shift.dto';

@Injectable()
export class ShiftService {
    constructor(
        @InjectRepository(Shift)
        private readonly shiftRepository: Repository<Shift>,
    ) { }

    async createShift(shiftDto: ShiftDto) {
        try {

            await this.shiftRepository.save(shiftDto)

            return { success: true, message: "Turno Guardado correctamente" }

        } catch (error) {
            return { success: false, message: "Excepcion al guardar turno" }
        }
    }

    async getAll() {
        const shifts = await this.shiftRepository.find({});
        return { success: true, data: shifts };

    }


    async getById(id: string) {
        try {
            const lote = await this.shiftRepository.findOne({ where: { id } });
            if (lote) {
                return { success: true, data: lote }
            }
            return { success: false, message: "No existe turno" }
        } catch (error) {
            return { success: false, message: "No existe turno" }
        }

    }


    async updateShift(id: string, shiftDto: ShiftDto) {
        try {
            const existLote = await this.shiftRepository.findOne({ where: { id } })
            if (!existLote) {
                return { success: false, message: "no exist turno" }
            }


            await this.shiftRepository.update(id, { name: shiftDto.name })

            return { success: true, message: "Turno actualizado correctamente" }

        } catch (error) {
            return { success: false, message: "No existe turno" }
        }


    }

    async deleteShift(id: string) {
        try {
            const existLote = await this.shiftRepository.findOne({ where: { id } })
            if (!existLote) {
                return { success: false, message: "No existe turno" }
            }
            await this.shiftRepository.delete(id)
            return { success: true, message: "Turno eliminado correctamente" }
        } catch (error) {
            return { success: false, message: "Turno asignado, no se puede eliminar" }
        };

    }




}