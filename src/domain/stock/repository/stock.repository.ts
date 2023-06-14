import { Stock } from '../entity/stock';

export interface IStockRepository {
  findMany(): Promise<{ items: Stock[]; totalCount: number } | null>;

  findLessThanMinAmount(): Promise<{
    items: Stock[];
    totalCount: number;
  } | null>;
}
