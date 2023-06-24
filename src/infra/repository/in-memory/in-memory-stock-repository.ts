import { Stock } from '@/domain/stock/entity/stock';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';

export class InMemoryStockRepository implements IStockRepository {
  items: Stock[] = [];

  async create(stock: Stock): Promise<void> {
    this.items.push(stock);
  }

  async save(stock: Stock): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === stock.id);

    this.items[itemIndex] = stock;
  }

  async findByType(type: string): Promise<Stock> {
    const item = this.items.find((item) => item.itemType === type);

    return item;
  }

  async findMany(): Promise<{ items: Stock[]; totalCount: number } | null> {
    const items = this.items.filter((item) => item.amount > 0);

    if (!items) {
      return null;
    }

    const totalCount = items.length;

    return { items, totalCount };
  }

  async findLessThanMinAmount(): Promise<{
    items: Stock[];
    totalCount: number;
  }> {
    const items = this.items.filter((item) => item.amount <= item.amountMin);

    if (!items) {
      return null;
    }

    const totalCount = items.length;

    return { items, totalCount };
  }
}
