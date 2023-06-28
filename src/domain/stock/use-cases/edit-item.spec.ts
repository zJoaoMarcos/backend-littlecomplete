import { InMemoryItemRepository } from '@/infra/repository/in-memory/in-memory-item-repository';
import { EditItemUseCase } from './edit-item';
import { MakeItem } from './factories/make-register-item';

let itemsRepository: InMemoryItemRepository;
let sut: EditItemUseCase;

describe('Edit Item Use Case', () => {
  itemsRepository = new InMemoryItemRepository();
  sut = new EditItemUseCase(itemsRepository);

  it('Should be able edit props of item ', async () => {
    itemsRepository.items.push(MakeItem({ id: 'generic-id' }));

    const { item } = await sut.execute({
      id: 'generic-id',
      brand: 'edited-brand',
      category: 'generic-category',
      model: 'generic-model',
      type: 'generic-type',
    });

    expect(item).toBeTruthy();
  });
});
