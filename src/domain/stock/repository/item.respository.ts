import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '../entity/item';

export interface IItemRepository {
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  findMany(params: PaginationParams): Promise<FindManyResponse>;
  findById(id: string): Promise<Item>;
  findByName(name: string): Promise<Item | null>;
}

interface FindManyResponse {
  items: Item;
  totalCount: number;
}
