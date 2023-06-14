import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';
import { IStockRepository } from '../repository/stock.repository';

interface FetchItemsBellowMinimumAmountRequest {
  params: PaginationParams;
}

interface FetchItemsBellowMinimumAmountResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchItemsBellowMinimumAmount {
  constructor(private stockRepository: IStockRepository) {}

  async execute(): Promise<FetchItemsBellowMinimumAmountResponse> {
    const { items, totalCount } =
      await this.stockRepository.findLessThanMinAmount();

    return {
      items,
      totalCount,
    };
  }
}
