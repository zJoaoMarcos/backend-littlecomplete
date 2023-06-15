import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [StockController],
  providers: [
    StockService,
    /*  {
      provide: TypeOrmItemRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmItemRepository(dataSource.getRepository(StockSchema));
      },
      inject: [getDataSourceToken()],
    }, */
  ],
})
export class StockModule {}
