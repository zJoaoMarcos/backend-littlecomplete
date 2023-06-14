import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';
import { ItemNotFoundError } from './errors/item-not-found.error';

interface FetchItemsByTypeRequest {
  type: string;
}

interface FetchItemsByTypeResponse {
  items: Item[];
  totalCount: number;
}

export class FethcItemsByTypeUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({
    type,
  }: FetchItemsByTypeRequest): Promise<FetchItemsByTypeResponse> {
    const { items, totalCount } = await this.itemRepository.findByType(type);

    if (!items) {
      throw new ItemNotFoundError();
    }

    return { items, totalCount };
  }
}
