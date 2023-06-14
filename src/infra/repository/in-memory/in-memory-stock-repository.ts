import { Stock } from '@/domain/stock/entity/stock';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';

export class InMemoryStockRepository implements IStockRepository {
  items: Stock[] = [];

  async findMany(): Promise<{ items: Stock[]; totalCount: number } | null> {
    const items = this.items.filter((item) => item.amount >= item.amountMin);

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
