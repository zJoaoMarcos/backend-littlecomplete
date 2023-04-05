import { Module } from '@nestjs/common';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DepartmentsModule, UsersModule, EquipmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
