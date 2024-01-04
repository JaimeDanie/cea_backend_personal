import { Module } from '@nestjs/common';
import { OperateService } from './services/operate.service';
import { OperateController } from './controllers/operate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operate } from './entities/operate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Operate])],
  providers: [OperateService],
  controllers: [OperateController],
  exports: [OperateService],
})
export class OperateModule {}
