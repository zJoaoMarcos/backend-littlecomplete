import { Transaction } from '@/domain/stock/entity/transaction';
import { ITransactionRepository } from '@/domain/stock/repository/transaction.repository';
import { Repository } from 'typeorm';
import { StockTransactionsSchema } from './entities/stock-transactions.schema';

export class TypeOrmStockTransctionRepository
  implements ITransactionRepository
{
  constructor(private readonly ormRepo: Repository<StockTransactionsSchema>) {}
  async create(transaction: Transaction): Promise<void> {
    await this.ormRepo.save({
      item: {
        id: transaction.id,
      },
      type: transaction.type,
      amount: transaction.amount,
      price: String(transaction.price),
      requester: { username: transaction.requester },
      invoice: transaction.invoice,
      supplier: transaction.supplier,
      createdAt: transaction.createdAt,
      createdBy: {
        email: transaction.createdBy,
      },
    });
  }
}
