import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';
import { ItemNotFoundError } from './errors/item-not-found.error';

interface EditItemRequest {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: string;
  category: string;
}

interface EditItemResponse {
  item: Item;
}

export class EditItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({
    id,
    name,
    brand,
    category,
    model,
    type,
  }: EditItemRequest): Promise<EditItemResponse> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new ItemNotFoundError();
    }

    item.name = name;
    item.brand = brand;
    item.category = category;
    item.model = model;
    item.type = type;

    await this.itemRepository.save(item);
    return {
      item,
    };
  }
}
