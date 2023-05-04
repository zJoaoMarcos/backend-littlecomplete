import { Equipment } from '../../../domain/entity/equipment';
import { IEquipmentRepository } from '../../../domain/repository/equipment-repository';

export class InMemoryEquipmentRepository implements IEquipmentRepository {
  equipments: Equipment[] = [];

  async create(equipment: Equipment): Promise<Equipment> {
    this.equipments.push(equipment);

    return Promise.resolve(equipment);
  }

  async findAll(): Promise<Equipment[]> {
    return Promise.resolve(this.equipments);
  }

  async findById(id: string): Promise<Equipment> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    if (!equipment) {
      return null;
    }

    return Promise.resolve(equipment);
  }

  findByUserId(userId: string): Promise<Equipment[]> {
    throw new Error('Method not implemented.');
  }

  async updateDepartment(id: string, department: string): Promise<void> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    equipment.department = department;
  }
}
