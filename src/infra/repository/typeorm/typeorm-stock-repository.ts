import { Stock } from '@/domain/stock/entity/stock';
import { IStockRepository } from '@/domain/stock/repository/stock.repository';
import { Repository } from 'typeorm';
import { StockSchema } from './entities/stock.schema';

export class TypeOrmStockRepository implements IStockRepository {
  constructor(private readonly ormRepo: Repository<StockSchema>) {}

  async findMany(): Promise<{ items: Stock[]; totalCount: number } | null> {
    const [result, totalCount] = await this.ormRepo.findAndCount();

    if (!result) {
      return null;
    }

    const items = result.map((item) => {
      return Stock.create({
        id: item.id,
        itemType: item.type,
        amount: item.amount,
        amountMin: item.amountMin,
      });
    });

    return {
      items,
      totalCount,
    };
  }

  async findLessThanMinAmount(): Promise<{
    items: Stock[];
    totalCount: number;
  }> {
    const [result, totalCount] = await this.ormRepo
      .createQueryBuilder('stock')
      .where('stock.amount <= stock.amountMin')
      .getManyAndCount();

    if (!result) {
      return null;
    }

    const items = result.map((item) => {
      return Stock.create({
        id: item.id,
        itemType: item.type,
        amount: item.amount,
        amountMin: item.amountMin,
      });
    });

    return {
      items,
      totalCount,
    };
  }
}
