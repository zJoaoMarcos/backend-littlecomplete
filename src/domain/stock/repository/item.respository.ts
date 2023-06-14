import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '../entity/item';

export interface IItemRepository {
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  findMany(params: PaginationParams): Promise<FindManyItemResponse | null>;
  findById(id: string): Promise<Item | null>;
  findByName(name: string): Promise<Item | null>;
}

export type FindManyItemResponse = {
  items: Item[];
  totalCount: number;
};
