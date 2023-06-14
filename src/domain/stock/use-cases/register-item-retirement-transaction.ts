import { randomUUID } from 'crypto';
import { Transaction } from '../entity/transaction';
import { IItemRepository } from '../repository/item.respository';
import { ITransactionRepository } from '../repository/transaction.repository';

interface RegisterItemRetirementRequest {
  itemId: string;
  price: number;
  amount: number;
  requester: string;
  supplier: string;
  nf: string;
  createdBy: string;
}

interface RegisterItemRetirementResponse {
  transaction: Transaction;
}

export class RegisterItemRetirementUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private itemRepository: IItemRepository,
  ) {}

  async execute({
    itemId,
    amount,
    requester,
    createdBy,
  }: RegisterItemRetirementRequest): Promise<RegisterItemRetirementResponse> {
    const item = await this.itemRepository.findById(itemId);

    if (!item) {
      throw new Error('Item not Found');
    }

    const currentAmount = item.amount;

    if (amount > currentAmount) {
      throw new Error('Requested quantity unavailable');
    }

    item.amount = amount - currentAmount;

    await this.itemRepository.save(item);

    const transaction = new Transaction({
      id: randomUUID(),
      itemId,
      type: 'output',
      price: null,
      amount,
      supplier: null,
      requester,
      nf: null,
      createdAt: new Date(),
      createdBy,
    });

    await this.transactionRepository.create(transaction);

    return {
      transaction,
    };
  }
}
