import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { MakeItem } from './factories/make-register-item';
import { FethcItemsByTypeUseCase } from './fetch-items-by-type';

let itemsRepository: InMemoryItemRepository;
let sut: FethcItemsByTypeUseCase;

describe('Fetch Items By Type Use Case', () => {
  beforeEach(() => {
    itemsRepository = new InMemoryItemRepository();
    sut = new FethcItemsByTypeUseCase(itemsRepository);
  });

  it('Should be able list items by type', async () => {
    itemsRepository.items.push(
      MakeItem({ type: 'type-1' }),
      MakeItem({ type: 'type-1' }),
      MakeItem({ type: 'type-2' }),
      MakeItem({ type: 'type-1' }),
      MakeItem({ type: 'type-1' }),
      MakeItem({ type: 'type-2' }),
    );

    const { items, totalCount } = await sut.execute({ type: 'type-2' });

    expect(items[0].type).toEqual('type-2');
    expect(totalCount).toEqual(2);
  });
});
