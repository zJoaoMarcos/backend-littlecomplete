import { Equipment } from 'src/core/entity/Equipment';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { Repository } from 'typeorm';

export class TypeOrmEquipmentRepository
  implements EquipmentRepositoryInterface
{
  constructor(private ormRepo: Repository<Equipment>) {}

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
    return this.ormRepo.find();
  }

  async findById(id: string): Promise<Equipment> {
    return this.ormRepo.findOneBy({ id });
  }

  async update(id: string, department: string): Promise<void> {
    await this.ormRepo.update({ id }, { department: department });
  }
}
