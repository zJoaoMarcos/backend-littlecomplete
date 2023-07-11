import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// Schemas
import { AdministratorSchema } from './infra/repository/typeorm/entities/administrator.schema';
import { AuditorySchema } from './infra/repository/typeorm/entities/auditory.schema';
import { DepartmentsSchema } from './infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from './infra/repository/typeorm/entities/equipments-user.schema';
import { EquipmentsSchema } from './infra/repository/typeorm/entities/equipments.schema';
import { ItemSchema } from './infra/repository/typeorm/entities/item.schema';
import { StockTransactionsSchema } from './infra/repository/typeorm/entities/stock-transactions.schema';
import { UsersSchema } from './infra/repository/typeorm/entities/users.schema';

// Modules
import { AdministratorModule } from './modules/administrator/administrator.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EquipmentsModule } from './modules/equipments/equipments.module';
import { StockModule } from './modules/stock/stock.module';
import { UsersModule } from './modules/users/users.module';

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
        AdministratorSchema,
        EquipmentsUserSchema,
        UsersSchema,
        StockTransactionsSchema,
        ItemSchema,
        AuditorySchema,
      ],
    }),
    StockModule,
    DepartmentsModule,
    EquipmentsModule,
    UsersModule,
    AdministratorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
