import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { RegisterItemUseCase } from './register-item';

let itemsRepository: InMemoryItemRepository;
let sut: RegisterItemUseCase;

describe('Register Item Use Case', () => {
  beforeEach(() => {
    itemsRepository = new InMemoryItemRepository();
    sut = new RegisterItemUseCase(itemsRepository);
  });

  it('Should be able register new item', async () => {
    const { item } = await sut.execute({
      name: 'new item',
      model: 'generic-model',
      brand: 'generic-brand',
      type: 'generic-type',
      category: 'generic-category',
      createdBy: 'jhon.doe@example.com',
    });

    expect(item).toBeTruthy();
  });
});
