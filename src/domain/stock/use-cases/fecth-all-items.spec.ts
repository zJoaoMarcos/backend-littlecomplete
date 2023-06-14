import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { MakeItem } from './factories/make-register-item';
import { FetchAllItemsUseCase } from './fetch-all-items';

let itemsRepository: InMemoryItemRepository;
let sut: FetchAllItemsUseCase;

describe('Fetch All Items Use Case Use Case', () => {
  beforeEach(() => {
    itemsRepository = new InMemoryItemRepository();
    sut = new FetchAllItemsUseCase(itemsRepository);
  });

  it('Should be able list all Items ', async () => {
    itemsRepository.items.push(
      MakeItem(),
      MakeItem(),
      MakeItem(),
      MakeItem(),
      MakeItem(),
    );

    const { totalCount } = await sut.execute({ params: {} });

    expect(totalCount).toEqual(5);
  });
});
