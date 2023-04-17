import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentSchema } from './infra/repository/typeorm/entities/department.schema';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'dev',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      entities: [DepartmentSchema],
    }),
    DepartmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
