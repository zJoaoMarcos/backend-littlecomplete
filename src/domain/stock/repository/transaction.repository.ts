import { Transaction } from '../entity/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<void>;
}
