import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';

export interface IStockRepository {
  findMany(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number }>;
  findLessThanMinAmount(
    params: PaginationParams,
  ): Promise<{ items: Stock[]; totalCount: number }>;
}
