import { Module } from '@nestjs/common';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [DepartmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
