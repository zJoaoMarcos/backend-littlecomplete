import { randomUUID } from 'crypto';
import { Transaction } from '../entity/transaction';
import { IItemRepository } from '../repository/item.respository';
import { ITransactionRepository } from '../repository/transaction.repository';
import { ItemNotFoundError } from './errors/item-not-found.error';

interface RegisterNewItemEntryTransactionRequest {
  itemId: string;
  price: number;
  amount: number;
  supplier: string;
  nf: string;
  createdBy: string;
}

interface RegisterNewItemEntryTransactionResponse {
  transaction: Transaction;
}

export class RegisterNewItemEntryTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private ItemRepository: IItemRepository,
  ) {}

  async execute({
    itemId,
    price,
    amount,
    supplier,
    nf,
    createdBy,
  }: RegisterNewItemEntryTransactionRequest): Promise<RegisterNewItemEntryTransactionResponse> {
    const item = await this.ItemRepository.findById(itemId);

    if (!item) {
      throw new ItemNotFoundError();
    }

    const updatedAmount = item.amount + amount;

    item.amount = updatedAmount;

    await this.ItemRepository.save(item);

    const transaction = new Transaction({
      id: randomUUID(),
      itemId,
      type: 'input',
      price,
      amount,
      supplier,
      requester: null,
      nf,
      createdAt: new Date(),
      createdBy,
    });

    await this.transactionRepository.create(transaction);

    return {
      transaction,
    };
  }
}
