import { Item } from '../entity/item';

export interface IItemRepository {
  create(item: Item): Promise<void>;
  findByName(name: string): Promise<Item | null>;
}
