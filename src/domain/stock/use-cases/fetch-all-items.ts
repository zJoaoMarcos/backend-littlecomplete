import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';

interface FetchAllItemsRequest {
  params: PaginationParams;
}

interface FetchAllItemsResponse {
  items: Item[];
  totalCount: number;
}

export class FetchAllItemsUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({
    params,
  }: FetchAllItemsRequest): Promise<FetchAllItemsResponse> {
    const { items, totalCount } = await this.itemRepository.findMany(params);

    if (!items) {
      throw Error('Items not found');
    }

    return { items, totalCount };
  }
}
