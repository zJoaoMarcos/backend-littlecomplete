import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { InMemoryStockRepository } from '@/infra/repository/in-memory/in-memory-stock-repository';
import { InMemoryTransactionRepository } from '@/infra/repository/in-memory/in-memory-transaction-repository';
import { randomUUID } from 'crypto';
import { Stock } from '../entity/stock';
import { RequestedQuantityUnavailableError } from './errors/requested-quantity-unavailable.error';
import { MakeItem } from './factories/make-register-item';
import { RegisterItemRetirementTransactionUseCase } from './register-item-retirement-transaction';

let transactionsRepository: InMemoryTransactionRepository;
let itemsRepository: InMemoryItemRepository;
let stockRepository: InMemoryStockRepository;
let sut: RegisterItemRetirementTransactionUseCase;

describe('Register Item Retirement Transaction Use Case ', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository();
    itemsRepository = new InMemoryItemRepository();
    stockRepository = new InMemoryStockRepository();
    sut = new RegisterItemRetirementTransactionUseCase(
      transactionsRepository,
      itemsRepository,
      stockRepository,
    );
  });

  it('Should be able register item retirement transaction', async () => {
    stockRepository.items.push(
      Stock.create({
        amount: 20,
        amountMin: 10,
        id: randomUUID(),
        itemType: 'keyboard',
      }),
    );
    const item = MakeItem({ amount: 10, type: 'keyboard' });
    itemsRepository.items.push(item);

    const { transaction } = await sut.execute({
      itemId: item.id,
      amount: 2,
      requester: 'lana.doe',
      createdBy: 'jhon.doe@example.com',
    });

    expect(transaction.type).toEqual('output');
    expect(item.amount).toEqual(8);
  });

  it('Should not be able register retirement transaction with amount more that amount min', async () => {
    const item = MakeItem({ amount: 1 });
    itemsRepository.items.push(item);

    await expect(() =>
      sut.execute({
        itemId: item.id,
        amount: 2,
        requester: 'lana.doe',
        createdBy: 'jhon.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(RequestedQuantityUnavailableError);
  });
});
