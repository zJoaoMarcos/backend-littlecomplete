import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';

interface FindItemByIdRequest {
  id: string;
}

interface FindItemByIdResponse {
  item: Item;
}

export class FindItemByIdUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({ id }: FindItemByIdRequest): Promise<FindItemByIdResponse> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new Error('Item not found');
    }

    return { item };
  }
}
