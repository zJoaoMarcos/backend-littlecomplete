import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Equipment } from '../../../domain/entity/equipment';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '../../../domain/repository/equipment-repository';

export class InMemoryEquipmentRepository implements IEquipmentRepository {
  equipments: Equipment[] = [];

  async create(
    id: string,
    brand: string,
    model: string,
    department: string,
    status: string,
    supplier = null,
    invoice = null,
    warranty = null,
    purchase_date = null,
    cpu = null,
    ram = null,
    slots = null,
    storage0_type = null,
    storage0_syze = null,
    storage1_type = null,
    storage1_syze = null,
    video = null,
    service_tag = null,
  ): Promise<Equipment> {
    const equipment = Equipment.create({
      id,
      brand,
      model,
      department,
      status,
      supplier,
      invoice,
      warranty,
      purchase_date,
      cpu,
      ram,
      slots,
      storage0_type,
      storage0_syze,
      storage1_type,
      storage1_syze,
      video,
      service_tag,
    });

    this.equipments.push(equipment);

    return Promise.resolve(equipment);
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const equipments = this.equipments;
    const totalCount = equipments.length;
    return {
      equipments,
      totalCount,
    };
  }

  async findById(id: string): Promise<Equipment> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    if (!equipment) {
      return null;
    }

    return Promise.resolve(equipment);
  }

  async updateDepartment(id: string, department: string): Promise<void> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    equipment.department = department;
  }
}
