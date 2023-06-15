import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { IItemRepository } from '@/domain/stock/repository/item.respository';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';
import { ITransactionRepository } from '@/domain/stock/repository/transaction.repository';
import { EditItemUseCase } from '@/domain/stock/use-cases/edit-item';
import { FetchAllItemsUseCase } from '@/domain/stock/use-cases/fetch-all-items';
import { FetchStockListUseCase } from '@/domain/stock/use-cases/fetch-stock-list';
import { RegisterItemUseCase } from '@/domain/stock/use-cases/register-item';
import { RegisterItemRetirementTransactionUseCase } from '@/domain/stock/use-cases/register-item-retirement-transaction';
import { RegisterNewItemEntryTransactionUseCase } from '@/domain/stock/use-cases/register-new-item-entry-transaction';
import { ItemSchema } from '@/infra/repository/typeorm/entities/item.schema';
import { StockTransactionsSchema } from '@/infra/repository/typeorm/entities/stock-transactions.schema';
import { StockSchema } from '@/infra/repository/typeorm/entities/stock.schema';
import { TypeOrmItemRepository } from '@/infra/repository/typeorm/typeorm-item-repository';
import { TypeOrmStockRepository } from '@/infra/repository/typeorm/typeorm-stock-repository';
import { TypeOrmStockTransctionRepository } from '@/infra/repository/typeorm/typeorm-stock-transaction-repository';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemSchema,
      StockSchema,
      StockTransactionsSchema,
    ]),
  ],
  controllers: [StockController],
  providers: [
    StockService,
    // Repositories
    {
      provide: TypeOrmItemRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmItemRepository(dataSource.getRepository(ItemSchema));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: TypeOrmStockRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmStockRepository(
          dataSource.getRepository(StockSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: TypeOrmStockTransctionRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmStockTransctionRepository(
          dataSource.getRepository(StockTransactionsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },

    // Stock

    {
      provide: FetchStockListUseCase,
      useFactory: (stockRepo: IStockRepository) => {
        return new FetchStockListUseCase(stockRepo);
      },
      inject: [TypeOrmStockRepository],
    },

    // Item

    {
      provide: RegisterItemUseCase,
      useFactory: (itemRepo: IItemRepository) => {
        return new RegisterItemUseCase(itemRepo);
      },
      inject: [TypeOrmItemRepository],
    },
    {
      provide: FetchAllItemsUseCase,
      useFactory: (itemRepo: IItemRepository) => {
        return new FetchAllItemsUseCase(itemRepo);
      },
      inject: [TypeOrmItemRepository],
    },
    {
      provide: EditItemUseCase,
      useFactory: (itemRepo: IItemRepository) => {
        return new EditItemUseCase(itemRepo);
      },
      inject: [TypeOrmItemRepository],
    },

    // Stock Transactions

    {
      provide: RegisterNewItemEntryTransactionUseCase,
      useFactory: (
        stockTransactionRepo: ITransactionRepository,
        itemRepo: IItemRepository,
      ) => {
        return new RegisterNewItemEntryTransactionUseCase(
          stockTransactionRepo,
          itemRepo,
        );
      },
    },
    {
      provide: RegisterItemRetirementTransactionUseCase,
      useFactory: (
        stockTransactionRepo: ITransactionRepository,
        itemRepo: IItemRepository,
      ) => {
        return new RegisterItemRetirementTransactionUseCase(
          stockTransactionRepo,
          itemRepo,
        );
      },
    },
  ],
})
export class StockModule {}
