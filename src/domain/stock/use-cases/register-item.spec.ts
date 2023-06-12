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
      category: 'generic-category',
      description: 'generic-description',
      amountMin: 4,
    });

    expect(item).toBeTruthy();
    expect(item.name).toEqual('new item');
  });

  //task
  /*   it('Should not be able to register a item with name twice', async () => {
    const item = MakeItem();
    itemsRepository.items.push(item);

    const newItem = MakeItem({
      name: item.name,
    });

    await expect(() =>
      sut.execute({ amountMin: newItem.amountMin, name: newItem.name }),
    );
  }); */
});
