import { randomUUID } from 'node:crypto';
import { Item } from '../entity/item';
import { Stock } from '../entity/stock';
import { IItemRepository } from '../repository/item.respository';
import { IStockRepository } from '../repository/stock.repository';

interface RegisterItemRequest {
  brand: string;
  model: string;
  type: string;
  isNewTypeGroup: boolean;
  newTypeName: string;
  newTypeAmountMin: number;
  category: string;
  createdBy: string;
}

interface RegisterItemResponse {
  item: Item;
}

export class RegisterItemUseCase {
  constructor(
    private itemRepository: IItemRepository,
    private stockRepository: IStockRepository,
  ) {}

  async execute({
    brand,
    model,
    type,
    category,
    createdBy,
    isNewTypeGroup,
    newTypeName,
    newTypeAmountMin,
  }: RegisterItemRequest): Promise<RegisterItemResponse> {
    if (isNewTypeGroup) {
      const stockGroup = Stock.create({
        id: randomUUID(),
        itemType: newTypeName,
        amount: 0,
        amountMin: newTypeAmountMin,
      });

      const item = new Item({
        id: randomUUID(),
        brand,
        model,
        type: newTypeName,
        category,
        amount: 0,
        updatedAt: new Date(),
        createdAt: new Date(),
        createdBy,
      });

      await this.itemRepository.create(item);
      await this.stockRepository.create(stockGroup);
    }

    const item = new Item({
      id: randomUUID(),
      brand,
      model,
      type,
      category,
      amount: 0,
      updatedAt: new Date(),
      createdAt: new Date(),
      createdBy,
    });

    await this.itemRepository.create(item);

    return { item };
  }
}
