import { Equipment } from '../entity/equipment';
import { EquipmentPerUser } from '../entity/equipment-per-user';
import { User } from '../entity/user';

export interface EquipmentPerUserRepositoryInterface {
  save(id: string, user: User, equipment: Equipment): Promise<EquipmentPerUser>;
  findAll(): Promise<EquipmentPerUser[]>;
  findByEquipmentId(id: string): Promise<EquipmentPerUser>;
  findByUserName(id: string): Promise<EquipmentPerUser[]>;
}
