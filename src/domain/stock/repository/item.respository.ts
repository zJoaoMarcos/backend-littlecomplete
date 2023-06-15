import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '../entity/item';

export interface IItemRepository {
  save(item: Item): Promise<void>;
  create(item: Item): Promise<void>;
  findMany(
    params: PaginationParams,
  ): Promise<{ items: Item[]; totalCount: number } | null>;
  findById(id: string): Promise<Item | null>;
  findByType(
    type: string,
  ): Promise<{ items: Item[]; totalCount: number } | null>;
}
