import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '@/domain/stock/entity/item';
import {
  FindManyItemResponse,
  IItemRepository,
} from '@/domain/stock/repository/item.respository';

export class InMemoryItemRepository implements IItemRepository {
  items: Item[] = [];

  async create(item: Item): Promise<void> {
    this.items.push(item);
  }

  async findByName(name: string): Promise<Item | null> {
    const item = this.items.find((item) => {
      return (item.name = name);
    });

    if (!item) {
      return null;
    }

    return item;
  }

  async save(item: Item): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === item.id);

    this.items[itemIndex] = item;
  }

  async findMany(
    params: PaginationParams,
  ): Promise<FindManyItemResponse | null> {
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
}
