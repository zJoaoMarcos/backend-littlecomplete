import { Equipment } from 'src/domain/entity/equipment';
import { Repository } from 'typeorm';
import { IEquipmentRepository } from '../../../domain/repository/equipment-repository';
import { EquipmentSchema } from './entities/equipments-schema';

export class TypeOrmEquipmentRepository implements IEquipmentRepository {
  constructor(private ormRepo: Repository<EquipmentSchema>) {}

  async create(equipment: Equipment): Promise<Equipment> {
    return this.ormRepo.save(equipment);
  }

  async findAll(skip?: number, take?: number): Promise<Equipment[]> {
    const equipments = await this.ormRepo.find({
      skip: skip,
      take: take,
    });

    return equipments.map((equipment) => {
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
        user_id: equipment.user ? equipment.user.username : null,
      });
    });
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
      user_id: equipment.user ? equipment.user.username : null,
    });
  }
  async findByUserId(id: string): Promise<Equipment[]> {
    const equipments = await this.ormRepo.findBy({ user: { username: id } });

    console.log(equipments);

    if (!equipments) {
      return null;
    }

    return equipments.map((equipment) => {
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
        user_id: equipment.user ? equipment.user.username : null,
      });
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
