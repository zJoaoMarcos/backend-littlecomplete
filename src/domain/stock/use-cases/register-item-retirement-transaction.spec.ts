import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { InMemoryTransactionRepository } from '@/infra/repository/in-memory/in-memory-transaction-repository';
import { RegisterItemRetirementTransactionUseCase } from './register-item-retirement-transaction';

let transactionsRepository: InMemoryTransactionRepository;
let itemsRepository: InMemoryItemRepository;
let sut: RegisterItemRetirementTransactionUseCase;

describe('Register Item Retirement Use Case', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionRepository();
    itemsRepository = new InMemoryItemRepository();
    sut = new RegisterItemRetirementTransactionUseCase(
      transactionsRepository,
      itemsRepository,
    );
  });

  it('Should be able register item retirement transaction');
});
