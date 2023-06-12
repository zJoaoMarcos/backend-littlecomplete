import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '../entity/item';

export interface IItemRepository {
  create(item: Item): Promise<void>;
  findMany(params: PaginationParams): Promise<FindManyResponse>;
  findByName(name: string): Promise<Item | null>;
}

interface FindManyResponse {
  items: Item;
  totalCount: number;
}
