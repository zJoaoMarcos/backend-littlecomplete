import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { RegisterNewItemEntryUseCase } from './register-new-item-entry';

let itemsRepository: InMemoryItemRepository;
let sut: RegisterNewItemEntryUseCase;

describe('Register New Item Use Case', () => {
  beforeEach(() => {
    itemsRepository = new InMemoryItemRepository();
  });
});
