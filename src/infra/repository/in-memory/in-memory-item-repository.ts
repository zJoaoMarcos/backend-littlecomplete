import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '@/domain/stock/entity/item';
import { IItemRepository } from '@/domain/stock/repository/item.respository';

export class InMemoryItemRepository implements IItemRepository {
  items: Item[] = [];

  async create(item: Item): Promise<void> {
    this.items.push(item);
  }

  async save(item: Item): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === item.id);

    this.items[itemIndex] = item;
  }

  async findMany(
    params: PaginationParams,
  ): Promise<{ items: Item[]; totalCount: number } | null> {
    const items = this.items;
    const totalCount = this.items.length;

    if (!items) {
      return null;
    }

    return {
      items,
      totalCount,
    };
  }

  async findById(id: string): Promise<Item | null> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findByType(
    type: string,
  ): Promise<{ items: Item[]; totalCount: number } | null> {
    const itemsByType = this.items.filter((item) => item.type === type);

    if (!itemsByType) {
      return null;
    }

    const totalCount = itemsByType.length;

    return { items: itemsByType, totalCount };
  }
}
