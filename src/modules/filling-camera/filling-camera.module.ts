import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { FilligCameraService } from './services/fillig-camera.service';
import { FilligCameraController } from './controllers/fillig-camera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FillingCamera } from './entities/filling-camera.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([FillingCamera])],
  providers: [FilligCameraService],
  controllers: [FilligCameraController],
  exports: [FilligCameraService],
})
export class FillingCameraModule {}
