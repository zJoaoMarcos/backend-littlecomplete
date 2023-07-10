import { randomUUID } from 'node:crypto';
import { Transaction } from '../entity/transaction';
import { IItemRepository } from '../repository/item.respository';
import { ITransactionRepository } from '../repository/transaction.repository';
import { ItemNotFoundError } from './errors/item-not-found.error';
import { RequestedQuantityUnavailableError } from './errors/requested-quantity-unavailable.error';

interface RegisterItemRetirementTransactionRequest {
  itemId: string;
  amount: number;
  requester: string;
  createdBy: string;
}

interface RegisterItemRetirementTransactionResponse {
  transaction: Transaction;
}

export class RegisterItemRetirementTransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private itemRepository: IItemRepository,
  ) {}

  async execute({
    itemId,
    amount,
    requester,
    createdBy,
  }: RegisterItemRetirementTransactionRequest): Promise<RegisterItemRetirementTransactionResponse> {
    const item = await this.itemRepository.findById(itemId);

    if (!item) {
      throw new ItemNotFoundError();
    }

    const currentAmount = item.amount;

    if (amount > currentAmount) {
      throw new RequestedQuantityUnavailableError();
    }

    item.amount = currentAmount - amount;
    await this.itemRepository.save(item);

    const transaction = new Transaction({
      id: randomUUID(),
      itemId,
      type: 'output',
      price: null,
      amount,
      supplier: null,
      requester,
      invoice: null,
      createdAt: new Date(),
      createdBy,
    });

    await this.transactionRepository.create(transaction);
    return {
      transaction,
    };
  }
}
