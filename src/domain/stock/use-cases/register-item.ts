import { randomUUID } from 'node:crypto';
import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';
import { ItemWithSameNameAlreadyExistsError } from './errors/item-with-same-name-already-exists.error';

interface RegisterItemRequest {
  name: string;
  brand: string;
  model: string;
  type: string;
  category: string;
  createdBy: string;
}

interface RegisterItemResponse {
  item: Item;
}

export class RegisterItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({
    name,
    brand,
    model,
    type,
    category,
    createdBy,
  }: RegisterItemRequest): Promise<RegisterItemResponse> {
    const itemWithSameName = await this.itemRepository.findByName(name);

    if (itemWithSameName) {
      throw new ItemWithSameNameAlreadyExistsError();
    }

    const item = new Item({
      id: randomUUID(),
      name,
      brand,
      model,
      type,
      category,
      amount: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy,
    });

    await this.itemRepository.create(item);

    return { item };
  }
}
