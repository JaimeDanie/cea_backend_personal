import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NonConformityService } from '../services/non-conformity.service';
import { NonConformity } from '../entities/NonConformity.entity';
import { NonConformityDto } from '../dtos/non-conformity.dto';

@ApiTags('No conformidad')
@Controller('non-conformity')
export class NonConformityController {
  constructor(private nonConformitySevice: NonConformityService) {}

  @Get()
  getAll(): Promise<NonConformity[]> {
    return this.nonConformitySevice.getAll();
  }

  @Post()
  saveNonConformity(
    @Body() nonConformityDto: NonConformityDto,
  ): Promise<NonConformity> {
    return this.nonConformitySevice.saveNonConformity(nonConformityDto);
  }
}
