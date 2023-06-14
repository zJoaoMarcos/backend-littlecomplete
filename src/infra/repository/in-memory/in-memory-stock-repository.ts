import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '@/domain/stock/entity/stock';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';

export class InMemoryStockRepository implements IStockRepository {
  items: Stock[] = [];

  async findMany(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number } | null> {
    const items = this.items.map((item) => {
      if (item.amount >= item.amountMin) {
        return item;
      }
    });

    if (!items) {
      return null;
    }

    const totalCount = this.items.length;

    return { items, totalCount };
  }

  async findLessThanMinAmount(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number }> {
    const items = this.items.map((item) => {
      if (item.amount <= item.amountMin) {
        return item;
      }
    });

    if (!items) {
      return null;
    }

    const totalCount = this.items.length;

    return { items, totalCount };
  }
}
