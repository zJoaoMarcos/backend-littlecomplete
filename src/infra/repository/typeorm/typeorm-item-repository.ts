import { PaginationParams } from '@/core/repositories/pagination-params';
import { Item } from '@/domain/stock/entity/item';
import { IItemRepository } from '@/domain/stock/repository/item.respository';
import { Repository } from 'typeorm';
import { ItemSchema } from './entities/item.schema';

export class TypeOrmItemRepository implements IItemRepository {
  constructor(private ormRepo: Repository<ItemSchema>) {}
  async save(item: Item): Promise<void> {
    await this.ormRepo.update(
      { id: item.id },
      {
        type: item.type,
        model: item.model,
        category: item.category,
        amount: item.amount,
        amountMin: item.amountMin,
        updatedAt: item.updatedAt,
      },
    );
  }

  async create(item: Item): Promise<void> {
    await this.ormRepo.save({
      type: item.type,
      model: item.model,
      category: item.category,
      amount: item.amount,
      createdBy: {
        username: item.createdBy,
      },
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });

    return;
  }

  async findMany(
    params: PaginationParams,
  ): Promise<{ items: Item[]; totalCount: number } | null> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      relations: {
        createdBy: true,
      },
    });

    if (!result) {
      return null;
    }

    const items = result.map((item) => {
      return Item.create({
        id: item.id,
        type: item.type,
        model: item.model,
        category: item.category,
        amount: item.amount,
        createdBy: item.createdBy.username,
        amountMin: item.amountMin,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    return {
      items,
      totalCount,
    };
  }

  async findById(id: string): Promise<Item> {
    const item = await this.ormRepo.findOne({
      where: { id },
    });

    if (!item) {
      return null;
    }

    return Item.create({
      id: item.id,
      type: item.type,
      model: item.model,
      category: item.category,
      amount: item.amount,
      createdBy: item.createdBy.username,
      amountMin: item.amountMin,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async findByType(
    type: string,
  ): Promise<{ items: Item[]; totalCount: number }> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      where: { type },
    });

    if (!result) {
      return null;
    }

    const items = result.map((item) => {
      return Item.create({
        id: item.id,
        type: item.type,
        model: item.model,
        category: item.category,
        amount: item.amount,
        createdBy: item.createdBy.username,
        amountMin: item.amountMin,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    return { items, totalCount };
  }
}
