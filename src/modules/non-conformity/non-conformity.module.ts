import { Module } from '@nestjs/common';
import { NonConformityService } from './services/non-conformity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonConformity } from './entities/NonConformity.entity';
import { NonConformityController } from './controllers/non-conformity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NonConformity])],
  providers: [NonConformityService],
  controllers: [NonConformityController],
  exports: [NonConformityService],
})
export class NonConformityModule {}
