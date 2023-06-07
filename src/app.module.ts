import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsSchema } from './infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from './infra/repository/typeorm/entities/equipments-user.schema';
import { EquipmentsSchema } from './infra/repository/typeorm/entities/equipments.schema';
import { UsersSchema } from './infra/repository/typeorm/entities/users.schema';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { UserAssignmentsModule } from './modules/user-assignments/user-assignments.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [
        DepartmentsSchema,
        EquipmentsSchema,
        EquipmentsUserSchema,
        UsersSchema,
      ],
    }),
    DepartmentsModule,
    EquipmentsModule,
    UsersModule,
    UserAssignmentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
