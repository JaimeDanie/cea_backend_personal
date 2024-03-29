import { NonConformityService } from './../../non-conformity/services/non-conformity.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';
import { UpdateLoteDto } from '../dtos/lote-update.dto';
import { OrderDetail } from '../entities/order-detail.entity';
import { LoteDto, LoteDtoSeveral } from '../dtos/lote.dto';

@Injectable()
export class LoteService {
    constructor(
        @InjectRepository(Lote)
        private readonly loteRepository: Repository<Lote>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        private readonly nonConformityService: NonConformityService,
    ) { }

    async getAll() {
        const lotes = await this.loteRepository.find({});
        return { success: true, data: lotes };

    }


    async getById(id: number) {
        let lote = await this.loteRepository.findOne({ where: { numlote: id } });
        if (lote) {
            const orderLote = await this.orderDetailRepository.find({ where: { lote: id.toString() }, relations: { order: true } })
            if (orderLote.length > 0) {
                const loteUpdated = await this.loteRepository.update(id, { ...lote, orden: orderLote[0].order });
                if (loteUpdated.affected) {
                    lote = await this.loteRepository.findOne({
                        where: { numlote: id },
                        relations: ['orden', 'orden.product', 'orden.filler', 'orden.operate', 'orden.supervisor']
                    });
                }
            }
            return { success: true, data: lote }
        }
        return { success: false, message: "no exist lote" }
    }


    async updateLote(id: number, updateLote: UpdateLoteDto) {
        try {
            const existLote = await this.loteRepository.findOne({ where: { numlote: id } })
            if (!existLote) {
                return { success: false, message: "No existe lote" }
            }
            const existStatus = await this.nonConformityService.getById(updateLote.status)
            if (!existStatus) {
                return { success: false, message: "No existe status" }
            }

            await this.loteRepository.update(id, { ...existLote, status: existStatus })

            return { success: true, message: "Lote actualizado correctamente" }

        } catch (error) {
            return { success: false, message: "No existe status." }
        }


    }

    async updateLoteInformation(id: number, updateLote: LoteDto) {
        try {
            const existLote = await this.loteRepository.findOne({ where: { numlote: id } })
            if (!existLote) {
                return { success: false, message: "no exist lote" }
            }

            await this.loteRepository.update(id, { ...existLote, ...updateLote })

            return { success: true, message: "Actualizada informacion de lote correctamente" }

        } catch (error) {
            return { success: false, message: "No existe lote" }
        }


    }

    async updateLoteInformationSeveral(updateLote: LoteDtoSeveral) {
        try {
            const existLotes = await Promise.all(updateLote.lotes.map(async (lote) => {
                return await this.loteRepository.findOne({ where: { numlote: lote } })
            }))
            const exitenLotes = existLotes.filter((lote) => lote === null)
            if (exitenLotes.length > 0) {
                return { success: false, message: "Lotes no existen" + exitenLotes.join("-") }
            }
            const updatedLotes = await Promise.all(existLotes.map(async (lote) => {
                delete updateLote["lotes"]
                return await this.loteRepository.update(lote.numlote, { ...lote, ...updateLote })
            }))

            const noSavedLotes = updatedLotes.filter((lotes) => lotes.affected === 0)
            if (noSavedLotes.length === 0) {
                return { success: true, message: "Actualizada informacion de lote correctamente" }
            } else {
                return { success: false, message: "Lotes no se actualizaron " + noSavedLotes.join("-") }
            }

        } catch (error) {
            console.log("ERROR==>", error)
            return { success: false, message: "Error al actualizar lotes" }
        }


    }


}