import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { randomUUID } from 'crypto';
import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';

interface RegisterItemRequest {
  category: string;
  type: string;
  model: string;
  amountMin: number;
  createdBy: string;
}

interface RegisterItemResponse {
  item: Item;
}

export class RegisterItemUseCase {
  constructor(
    private itemRepository: IItemRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    model,
    type,
    category,
    createdBy,
    amountMin,
  }: RegisterItemRequest): Promise<RegisterItemResponse> {
    const item = Item.create({
      id: randomUUID(),
      model,
      type,
      category,
      amount: 0,
      amountMin,
      createdAt: new Date(),
      createdBy,
      updatedAt: null,
    });

    await this.itemRepository.create(item);

    const action = Auditory.create({
      id: randomUUID(),
      type: 'POST',
      description: `register new item ${JSON.stringify(item.props)}`,
      module: 'Stock',
      form: 'register-new-item',
      createdAt: new Date(),
      createdBy,
    });

    await this.auditoryRepository.create(action);

    return { item };
  }
}
