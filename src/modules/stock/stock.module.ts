import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';

import { StockSchema } from '@/infra/repository/typeorm/entities/stock.schema';
import { DataSource } from 'typeorm';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [StockController],
  providers: [
    StockService,
    {
      provide: TypeOrmItemRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmItemRepository(dataSource.getRepository(StockSchema));
      },
      inject: [getDataSourceToken()],
    },
  ],
})
export class StockModule {}
