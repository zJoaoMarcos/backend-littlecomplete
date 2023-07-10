import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { randomUUID } from 'crypto';
import { Item } from '../entity/item';
import { IItemRepository } from '../repository/item.respository';
import { ItemNotFoundError } from './errors/item-not-found.error';

interface EditItemRequest {
  id: string;
  brand: string;
  model: string;
  type: string;
  category: string;
  updatedBy: string;
}

interface EditItemResponse {
  item: Item;
}

export class EditItemUseCase {
  constructor(
    private itemRepository: IItemRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    id,
    brand,
    category,
    model,
    type,
    updatedBy,
  }: EditItemRequest): Promise<EditItemResponse> {
    const item = await this.itemRepository.findById(id);

    if (!item) {
      throw new ItemNotFoundError();
    }

    const updatedItem = item;

    updatedItem.brand = brand;
    updatedItem.category = category;
    updatedItem.model = model;
    updatedItem.type = type;

    await this.itemRepository.save(updatedItem);

    const action = Auditory.create({
      id: randomUUID(),
      type: 'PATCH',
      module: 'Stock',
      form: 'update-item',
      description: `the item: ${JSON.stringify(
        item.props,
      )}, has been updated to ${JSON.stringify(updatedItem.props)}`,
      createdAt: new Date(),
      createdBy: updatedBy,
    });

    await this.auditoryRepository.create(action);

    return {
      item: updatedItem,
    };
  }
}
