import { randomUUID } from 'node:crypto';
import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';

interface RegisterItemRequest {
  name: string;
  category: string;
  description: string;
  amountMin: number;
}

interface RegisterItemResponse {
  item: Item;
}

export class RegisterItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({
    name,
    category,
    description,
    amountMin,
  }: RegisterItemRequest): Promise<RegisterItemResponse> {
    const itemWithSameName = await this.itemRepository.findByName(name);

    if (itemWithSameName) {
      throw new Error('Item with same name exists');
    }

    const item = new Item({
      id: randomUUID(),
      name,
      description,
      category,
      amount: 0,
      amountMin,
      updateAt: new Date(),
      createdAt: new Date(),
    });

    await this.itemRepository.create(item);

    return { item };
  }
}
