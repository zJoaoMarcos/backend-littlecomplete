import { randomUUID } from 'crypto';
import { Transaction } from '../entity/transaction';
import { IItemRepository } from '../repository/item.respository';
import { IStockRepository } from '../repository/stock.repository';
import { ITransactionRepository } from '../repository/transaction.repository';
import { ItemNotFoundError } from './errors/item-not-found.error';

interface RegisterNewItemEntryTransactionRequest {
  itemId: string;
  price: number;
  amount: number;
  supplier: string;
  invoice: string;
  createdBy: string;
}

interface RegisterNewItemEntryTransactionResponse {
  transaction: Transaction;
}

export class RegisterNewItemEntryTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private ItemRepository: IItemRepository,
    private StockRepository: IStockRepository,
  ) {}

  async execute({
    itemId,
    price,
    amount,
    supplier,
    invoice,
    createdBy,
  }: RegisterNewItemEntryTransactionRequest): Promise<RegisterNewItemEntryTransactionResponse> {
    const item = await this.ItemRepository.findById(itemId);

    if (!item) {
      throw new ItemNotFoundError();
    }

    const stock = await this.StockRepository.findByType(item.type);
    stock.amount += amount;

    item.amount += amount;

    const transaction = new Transaction({
      id: randomUUID(),
      itemId,
      type: 'input',
      price,
      amount,
      supplier,
      requester: null,
      invoice,
      createdAt: new Date(),
      createdBy,
    });

    await this.transactionRepository.create(transaction);
    await this.ItemRepository.save(item);
    await this.StockRepository.save(stock);

    return {
      transaction,
    };
  }
}
