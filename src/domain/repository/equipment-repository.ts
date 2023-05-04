import { Equipment } from '../entity/equipment';

export interface IEquipmentRepository {
  create(equipment: Equipment): Promise<Equipment>;

  findAll(skip?: number, take?: number): Promise<Equipment[]>;

  findById(id: string): Promise<Equipment>;

  findByUserId(userId: string): Promise<Equipment[]>;

  updateDepartment(id: string, department: string): Promise<void>;
}
