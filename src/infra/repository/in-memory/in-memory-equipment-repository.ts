import { Equipment } from 'src/core/entity/equipment';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';

export class InMemoryEquipmentRepository
  implements EquipmentRepositoryInterface
{
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

  async update(equipment_id: string, department: string): Promise<void> {
    const equipment = this.equipments.find(
      (equipment) => equipment.id === equipment_id,
    );

    equipment.id = department;

    return;
  }
}
