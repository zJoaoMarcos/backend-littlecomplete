import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../../entity/stock';
import { IStockRepository } from '../../repository/stock.repository';

interface FetchItemsBellowMinAmountRequest {
  params: PaginationParams;
}

interface FetchItemsBellowMinAmountResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchItemsBellowMinAmount {
  constructor(private stockRepository: IStockRepository) {}

  async execute({
    params,
  }: FetchItemsBellowMinAmountRequest): Promise<FetchItemsBellowMinAmountResponse> {
    const { items, totalCount } =
      await this.stockRepository.findLessThanMinAmount(params);

    return {
      items,
      totalCount,
    };
  }
}
