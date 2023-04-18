import { Equipment } from 'src/core/entity/Equipment';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { Repository } from 'typeorm';
import { EquipmentSchema } from './entities/equipments-schema';

export class TypeOrmEquipmentRepository
  implements EquipmentRepositoryInterface
{
  constructor(private ormRepo: Repository<EquipmentSchema>) {}

  async create(
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
    return this.ormRepo.save({
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
  }

  async findAll(): Promise<Equipment[]> {
    const equipments = await this.ormRepo.find();

    if (!equipments) {
      return null;
    }

    return equipments.map((equipment) => {
      return new Equipment(
        equipment.id,
        equipment.brand,
        equipment.model,
        equipment.department,
        equipment.status,
        equipment.supplier,
        equipment.invoice,
        equipment.warranty,
        equipment.purchaseDate,
        equipment.cpu,
        equipment.ram,
        equipment.slots,
        equipment.storage0Type,
        equipment.storage0Syze,
        equipment.storage1Type,
        equipment.storage1Syze,
        equipment.video,
        equipment.serviceTag,
      );
    });
  }

  async findById(id: string): Promise<Equipment> {
    const equipment = await this.ormRepo.findOneBy({ id: id });

    if (!equipment) {
      return null;
    }

    return new Equipment(
      equipment.id,
      equipment.brand,
      equipment.model,
      equipment.department,
      equipment.status,
      equipment.supplier,
      equipment.invoice,
      equipment.warranty,
      equipment.purchaseDate,
      equipment.cpu,
      equipment.ram,
      equipment.slots,
      equipment.storage0Type,
      equipment.storage0Syze,
      equipment.storage1Type,
      equipment.storage1Syze,
      equipment.video,
      equipment.serviceTag,
    );
  }

  async update(id: string, department: string): Promise<void> {
    await this.ormRepo.update(id, { department });
  }
}
