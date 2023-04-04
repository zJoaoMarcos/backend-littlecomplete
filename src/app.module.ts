import { Module } from '@nestjs/common';
import { DepartmentsModule } from './modules/departments/departments.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DepartmentsModule, , UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
