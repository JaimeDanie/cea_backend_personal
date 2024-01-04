import { Module } from '@nestjs/common';
import { FillerController } from './controller/filler.controller';
import { FillerService } from './services/filler.service';
import { Filler } from './entities/filler.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TubularModule } from '../tubular/tubular.module';

@Module({
  imports: [TypeOrmModule.forFeature([Filler]), TubularModule],
  controllers: [FillerController],
  providers: [FillerService],
  exports: [FillerService],
})
export class FillerModule {}
