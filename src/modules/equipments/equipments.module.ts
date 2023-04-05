import { Module } from '@nestjs/common';
import { EquipmentsController } from './equipments.controller';

@Module({
  controllers: [EquipmentsController],
  providers: [],
})
export class EquipmentsModule {}
