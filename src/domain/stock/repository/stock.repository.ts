import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';

export interface IStockRepository {
  findMany(params: PaginationParams): Promise<FindManyResponse>;
  findLessThanMinAmount(params: PaginationParams): Promise<FindManyResponse>;
}

type FindManyResponse = {
  items: Stock[];
  totalCount: number;
};
