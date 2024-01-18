import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NonConformityService } from '../services/non-conformity.service';
import { NonConformity } from '../entities/NonConformity.entity';
import { NonConformityDto } from '../dtos/non-conformity.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('No conformidad')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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
