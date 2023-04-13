import { Equipment } from 'src/core/entity/equipment';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';

export class InMemoryEquipmentRepository
  implements EquipmentRepositoryInterface
{
  equipments: Equipment[] = [];

  create(
    id: string,
    brand: string,
    model: string,
    department: string,
    status: string,
    supplier?: string,
    invoice?: string,
    warranty?: string,
    purchase_date?: string,
    cpu?: string,
    ram?: string,
    slots?: number,
    storage0_type?: string,
    storage0_syze?: number,
    storage1_type?: string,
    storage1_syze?: number,
    video?: string,
    service_tag?: string,
  ): Promise<Equipment> {
    const equipment = {
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
    };

    this.equipments.push(equipment);

    return Promise.resolve(equipment);
  }

  findAll(): Promise<Equipment[]> {
    return Promise.resolve(this.equipments);
  }
  findById(id: string): Promise<Equipment> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    if (!equipment) {
      return null;
    }

    return Promise.resolve(equipment);
  }

  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
