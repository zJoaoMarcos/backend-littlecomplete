import { Item } from '@/domain/stock/entity/item';
import { IItemRepository } from '@/domain/stock/repository/item.respository';

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
}
