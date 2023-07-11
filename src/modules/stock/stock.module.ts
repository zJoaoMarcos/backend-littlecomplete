import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Repositories
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IItemRepository } from '@/domain/stock/repository/item.respository';
import { ITransactionRepository } from '@/domain/stock/repository/transaction.repository';
import { TypeOrmAuditoryRepository } from '@/infra/repository/typeorm/typeorm-auditory-repository';
import { TypeOrmItemRepository } from '@/infra/repository/typeorm/typeorm-item-repository';
import { TypeOrmStockTransctionRepository } from '@/infra/repository/typeorm/typeorm-stock-transaction-repository';

// Schemas
import { AuditorySchema } from '@/infra/repository/typeorm/entities/auditory.schema';
import { ItemSchema } from '@/infra/repository/typeorm/entities/item.schema';
import { StockTransactionsSchema } from '@/infra/repository/typeorm/entities/stock-transactions.schema';

// Use Cases
import { EditItemUseCase } from '@/domain/stock/use-cases/edit-item';
import { FetchAllItemsUseCase } from '@/domain/stock/use-cases/fetch-all-items';
import { FindItemByIdUseCase } from '@/domain/stock/use-cases/find-item-by-id';
import { RegisterItemUseCase } from '@/domain/stock/use-cases/register-item';
import { RegisterItemRetirementTransactionUseCase } from '@/domain/stock/use-cases/register-item-retirement-transaction';
import { RegisterNewItemEntryTransactionUseCase } from '@/domain/stock/use-cases/register-new-item-entry-transaction';

// Services & Controllers
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemSchema, StockTransactionsSchema])],
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
      provide: TypeOrmStockTransctionRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmStockTransctionRepository(
          dataSource.getRepository(StockTransactionsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: TypeOrmAuditoryRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmAuditoryRepository(
          dataSource.getRepository(AuditorySchema),
        );
      },
      inject: [getDataSourceToken()],
    },

    // Item

    {
      provide: RegisterItemUseCase,
      useFactory: (
        itemRepo: IItemRepository,
        auditRepo: IAuditoryRepository,
      ) => {
        return new RegisterItemUseCase(itemRepo, auditRepo);
      },
      inject: [TypeOrmItemRepository, TypeOrmAuditoryRepository],
    },
    {
      provide: FetchAllItemsUseCase,
      useFactory: (itemRepo: IItemRepository) => {
        return new FetchAllItemsUseCase(itemRepo);
      },
      inject: [TypeOrmItemRepository],
    },
    {
      provide: FindItemByIdUseCase,
      useFactory: (itemRepo: IItemRepository) => {
        return new FindItemByIdUseCase(itemRepo);
      },
      inject: [TypeOrmItemRepository],
    },
    {
      provide: EditItemUseCase,
      useFactory: (
        itemRepo: IItemRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new EditItemUseCase(itemRepo, auditoryRepo);
      },
      inject: [TypeOrmItemRepository, TypeOrmAuditoryRepository],
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
      inject: [TypeOrmStockTransctionRepository, TypeOrmItemRepository],
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
      inject: [TypeOrmStockTransctionRepository, TypeOrmItemRepository],
    },
  ],
})
export class StockModule {}
