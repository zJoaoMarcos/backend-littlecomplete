import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { InMemoryTransactionRepository } from '@/infra/repository/in-memory/in-memory-transaction-repository';
import { randomUUID } from 'crypto';
import { ItemNotFoundError } from './errors/item-not-found.error';
import { MakeItem } from './factories/make-register-item';
import { RegisterNewItemEntryTransactionUseCase } from './register-new-item-entry-transaction';

let transactionsRepository: InMemoryTransactionRepository;
let itemsRepository: InMemoryItemRepository;
let sut: RegisterNewItemEntryTransactionUseCase;

describe('Register New Item Entry Transaction Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository();
    itemsRepository = new InMemoryItemRepository();
    sut = new RegisterNewItemEntryTransactionUseCase(
      transactionsRepository,
      itemsRepository,
    );
  });

  it('Should be able register new item entry transaction', async () => {
    const item = MakeItem({ amount: 0 });
    itemsRepository.items.push(item);

    const { transaction } = await sut.execute({
      itemId: item.id,
      amount: 2,
      price: 2.3,
      createdBy: 'jhon.doe@example.com',
      nf: 'generic-nf',
      supplier: 'generic-supplier',
    });

    expect(transaction.type).toEqual('input');
    expect(item.amount).toEqual(2);
  });

  it('Must not be able to log an entry for a non-existent item', async () => {
    await expect(() =>
      sut.execute({
        itemId: randomUUID(),
        amount: 2,
        price: 2.3,
        createdBy: 'jhon.doe@example.com',
        nf: 'generic-nf',
        supplier: 'generic-supplier',
      }),
    ).rejects.toBeInstanceOf(ItemNotFoundError);
  });
});
