import { randomUUID } from 'crypto';
import { Transaction } from '../../entity/transaction';
import { IItemRepository } from '../../repository/item.respository';
import { ITransactionRepository } from '../../repository/transaction.repository';

interface RegisterNewItemEntryRequest {
  itemId: string;
  price: number;
  amount: number;
  requester: string;
  supplier: string;
  nf: string;
  createdBy: string;
}

interface RegisterNewItemEntryResponse {
  transaction: Transaction;
}

export class RegisterNewItemEntryUseCase {
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
  }: RegisterNewItemEntryRequest): Promise<RegisterNewItemEntryResponse> {
    const item = await this.ItemRepository.findById(itemId);

    if (!item) {
      throw new Error('Item not Found');
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
