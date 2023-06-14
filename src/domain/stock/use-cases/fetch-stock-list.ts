import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';
import { IStockRepository } from '../repository/stock.repository';

interface FetchStockListRequest {
  params: PaginationParams;
}

interface FetchStockListResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchStockListUseCase {
  constructor(private stockRepository: IStockRepository) {}

  async execute(): Promise<FetchStockListResponse> {
    const { items, totalCount } = await this.stockRepository.findMany();

    if (!items) {
      throw new Error('Item not found');
    }

    return {
      items,
      totalCount,
    };
  }
}
