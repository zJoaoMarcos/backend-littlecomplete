import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Equipment } from 'src/domain/entity/equipment';
import { Like, Repository } from 'typeorm';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '../../../domain/repository/equipment-repository';
import { EquipmentsSchema } from './entities/equipments.schema';

export class TypeOrmEquipmentRepository implements IEquipmentRepository {
  constructor(private ormRepo: Repository<EquipmentsSchema>) {}

  async create(equipment: Equipment): Promise<void> {
    await this.ormRepo.save({
      id: equipment.id,
      brand: equipment.brand,
      model: equipment.model,
      supplier: equipment.supplier,
      invoice: equipment.invoice,
      warranty: equipment.warranty,
      purchaseDate: equipment.purchase_date,
      status: equipment.status,
      cpu: equipment.cpu,
      ram: equipment.ram,
      slots: equipment.slots,
      storage0Type: equipment.storage0_type,
      storage0Syze: equipment.storage0_syze,
      storage1Type: equipment.storage1_type,
      storage1Syze: equipment.storage1_syze,
      video: equipment.video,
      serviceTag: equipment.service_tag,
      department: {
        id: equipment.department_id,
      },
    });
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: params.skip,
      take: params.take,
      relations: {
        department: true,
      },
      where: {
        id: params.id && Like(`%${params.id}%`),
        status: params.status && Like(`%${params.status}%`),
        department: {
          id: params.department_id && params.department_id,
        },
      },
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
        department: {
          id: equipment.department ? equipment.department.id : null,
          name: equipment.department ? equipment.department.name : null,
        },
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
  async findAvaliable(params: PaginationParams): Promise<FindManyOutput> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: params.skip,
      take: params.take,
      relations: {
        department: true,
      },
      where: {
        status: 'stock      ',
      },
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
        department: {
          id: equipment.department ? equipment.department.id : null,
          name: equipment.department ? equipment.department.name : null,
        },
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
    const equipment = await this.ormRepo.findOne({
      where: { id: id },
      relations: {
        department: true,
      },
    });

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
      department: {
        id: equipment.department.id,
        name: equipment.department.name,
      },
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

  async FindByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<FindManyOutput> {
    const [result, totalCount] = await this.ormRepo.findAndCount({
      where: {
        department: {
          id: departmentId,
        },
      },
      relations: {
        department: true,
      },
    });

    const equipments = result.map((equipment) => {
      return Equipment.create({
        id: equipment.id,
        brand: equipment.brand,
        model: equipment.model,
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        purchase_date: equipment.purchaseDate,
        department: {
          id: equipment.department.id,
          name: equipment.department.name,
        },
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

  async save(equipment: Equipment): Promise<void> {
    await this.ormRepo.update(
      { id: equipment.id },
      {
        brand: equipment.brand,
        model: equipment.model,
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        purchaseDate: equipment.purchase_date,
        status: equipment.status,
        cpu: equipment.cpu,
        ram: equipment.ram,
        slots: equipment.slots,
        storage0Type: equipment.storage0_type,
        storage0Syze: equipment.storage0_syze,
        storage1Type: equipment.storage1_type,
        storage1Syze: equipment.storage1_syze,
        video: equipment.video,
        serviceTag: equipment.service_tag,
        department: {
          id: equipment.department_id,
        },
      },
    );
  }
}
