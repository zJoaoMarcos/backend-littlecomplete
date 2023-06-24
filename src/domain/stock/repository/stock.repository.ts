import { Stock } from '../entity/stock';

export interface IStockRepository {
  create(stock: Stock): Promise<void>;
  save(stock: Stock): Promise<void>;
  findByType(type: string): Promise<Stock>;
  findMany(): Promise<{ items: Stock[]; totalCount: number } | null>;

  findLessThanMinAmount(): Promise<{
    items: Stock[];
    totalCount: number;
  } | null>;
}
