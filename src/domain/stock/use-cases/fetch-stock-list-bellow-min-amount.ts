import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';
import { IStockRepository } from '../repository/stock.repository';

interface FetchStockListBellowMinAmountRequest {
  params: PaginationParams;
}

interface FetchStockListBellowMinAmountResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchStockListBellowMinAmountUseCase {
  constructor(private stockRepository: IStockRepository) {}

  async execute(): Promise<FetchStockListBellowMinAmountResponse> {
    const { items, totalCount } =
      await this.stockRepository.findLessThanMinAmount();

    return {
      items,
      totalCount,
    };
  }
}
