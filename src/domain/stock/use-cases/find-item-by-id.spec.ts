import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { MakeItem } from './factories/make-register-item';
import { FindItemByIdUseCase } from './find-item-by-id';

let itemsRepository: InMemoryItemRepository;
let sut: FindItemByIdUseCase;

describe('Find Item By Id Use Case', () => {
  beforeEach(() => {
    itemsRepository = new InMemoryItemRepository();
    sut = new FindItemByIdUseCase(itemsRepository);
  });

  it('Should be able list items by type', async () => {
    itemsRepository.items.push(
      MakeItem({ id: 'generic-id', createdBy: 'jhon.doe@example.com' }),
      MakeItem(),
      MakeItem(),
      MakeItem(),
      MakeItem(),
      MakeItem(),
    );

    const { item } = await sut.execute({ id: 'generic-id' });

    expect(item.id).toEqual('generic-id');
    expect(item.createdBy).toEqual('jhon.doe@example.com');
  });
});
