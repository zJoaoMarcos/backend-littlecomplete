import { Transaction } from '@/domain/stock/entity/transaction';
import { ITransactionRepository } from '@/domain/stock/repository/transaction.repository';

export class InMemoryTransactionRepository implements ITransactionRepository {
  transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
