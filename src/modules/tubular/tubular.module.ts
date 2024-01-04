import { Module } from '@nestjs/common';
import { TubularController } from './controller/tubular.controller';
import { TubularService } from './services/tubular.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tubular } from './entities/tubular.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tubular])],
  controllers: [TubularController],
  providers: [TubularService],
  exports: [TubularService],
})
export class TubularModule {}
