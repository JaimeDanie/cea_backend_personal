import { NonConformityService } from './../../non-conformity/services/non-conformity.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';
import { UpdateLoteDto } from '../dtos/lote-update.dto';

@Injectable()
export class LoteService {
    constructor(
        @InjectRepository(Lote)
        private readonly loteRepository: Repository<Lote>,
        private readonly nonConformityService: NonConformityService,
    ) { }

    async getAll() {
        const lotes = await this.loteRepository.find({});
        return { success: true, data: lotes };

    }


    async getById(id: number) {
        const lote = await this.loteRepository.findOne({ where: { numlote: id } });
        if (lote) {
            return { success: true, data: lote }
        }
        return { success: false, message: "no exist lote" }
    }


    async updateLote(id: number, updateLote: UpdateLoteDto) {
        try {
            const existLote = await this.loteRepository.findOne({ where: { numlote: id } })
            if (!existLote) {
                return { success: false, message: "no exist lote" }
            }
            const existStatus = await this.nonConformityService.getById(updateLote.status)
            if (!existStatus) {
                return { success: false, message: "no exist status" }
            }

            await this.loteRepository.update(id, { ...existLote, status: existStatus })

            return { success: true, message: "update lote successfully" }

        } catch (error) {
            return { success: false, message: "no exist status exeption id" }
        }


    }


}