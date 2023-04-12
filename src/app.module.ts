import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentSchema } from './infra/repository/typeorm/department.schema';
import { DepartmentsModule } from './modules/departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'db_patriani',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      entities: [DepartmentSchema],
      synchronize: true,
    }),
    DepartmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
