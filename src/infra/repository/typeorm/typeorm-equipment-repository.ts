import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Equipment } from 'src/domain/entity/equipment';
import { Repository } from 'typeorm';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '../../../domain/repository/equipment-repository';
import { EquipmentSchema } from './entities/equipments-schema';

export class TypeOrmEquipmentRepository implements IEquipmentRepository {
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
    return this.ormRepo.save(equipment);
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: params.skip,
      take: params.take,
    });

    if (!result) {
      return null;
    }

    const equipments = result.map((equipment) => {
      return Equipment.create({
        id: equipment.id,
        brand: equipment.brand,
        model: equipment.model,
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        purchase_date: equipment.purchaseDate,
        department: equipment.department,
        status: equipment.status,
        cpu: equipment.cpu,
        ram: equipment.ram,
        slots: equipment.slots,
        storage0_type: equipment.storage0Type,
        storage0_syze: equipment.storage0Syze,
        storage1_type: equipment.storage1Type,
        storage1_syze: equipment.storage1Syze,
        video: equipment.video,
        service_tag: equipment.serviceTag,
      });
    });

    return {
      equipments,
      totalCount,
    };
  }

  async findById(id: string): Promise<Equipment> {
    const equipment = await this.ormRepo.findOneBy({ id: id });

    if (!equipment) {
      return null;
    }

    return Equipment.create({
      id: equipment.id,
      brand: equipment.brand,
      model: equipment.model,
      supplier: equipment.supplier,
      invoice: equipment.invoice,
      warranty: equipment.warranty,
      purchase_date: equipment.purchaseDate,
      department: equipment.department,
      status: equipment.status,
      cpu: equipment.cpu,
      ram: equipment.ram,
      slots: equipment.slots,
      storage0_type: equipment.storage0Type,
      storage0_syze: equipment.storage0Syze,
      storage1_type: equipment.storage1Type,
      storage1_syze: equipment.storage1Syze,
      video: equipment.video,
      service_tag: equipment.serviceTag,
    });
  }

  async updateDepartment(id: string, department: string): Promise<void> {
    await this.ormRepo.update(
      { id },
      {
        department,
      },
    );
  }
}
