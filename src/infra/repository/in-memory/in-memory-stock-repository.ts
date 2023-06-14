import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '@/domain/stock/entity/stock';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';

export class InMemoryStockRepository implements IStockRepository {
  items: Stock[] = [];

  findMany(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number }> {
    const items = this.items;
    const totalCount = items.length;

    return {
      items,
      totalCount,
    };
  }

  findLessThanMinAmount(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number }> {
    const stock = this.items.map((item) => {
      if (item.amount <= item.amountMin) {
        return item;
      }
    });
    const totalCount = stock.length;

    return { items: stock, totalCount };
  }
}
