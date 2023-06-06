import { Equipment } from '@/domain/inventory/entity/equipment';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '@/domain/inventory/repository/equipment.repository';
import { PaginationParams } from 'src/core/repositories/pagination-params';
import { ILike, Repository } from 'typeorm';
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
      purchaseDate: equipment.purchaseDate,
      status: equipment.status,
      cpu: equipment.cpu,
      ram: equipment.ram,
      slots: equipment.slots,
      storage0Type: equipment.storage0Type,
      storage0Syze: equipment.storage0Syze,
      storage1Type: equipment.storage1Type,
      storage1Syze: equipment.storage1Syze,
      video: equipment.video,
      serviceTag: equipment.serviceTag,
      department: {
        id: equipment.departmentId,
      },
    });
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const id = params.id ?? '';
    const type = params.type ?? '';
    const status = params.status ?? '';

    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: params.skip,
      take: params.take,
      relations: {
        department: true,
      },
      where: {
        id: ILike(`%${id}%`),
        type: ILike(`%${type}%`),
        status: ILike(`%${status}%`),
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
        type: equipment.type,
        status: equipment.status,
        serviceTag: equipment.serviceTag,
        patrimony: equipment.patrimony,
        brand: equipment.brand,
        model: equipment.model,
        purchase: {
          supplier: equipment.supplier,
          invoice: equipment.invoice,
          warranty: equipment.warranty,
          purchaseDate: equipment.purchaseDate,
        },
        config: {
          cpu: equipment.cpu,
          ram: equipment.ram,
          video: equipment.video,
          storage: {
            slots: equipment.slots,
            storage0Type: equipment.storage0Type,
            storage0Syze: equipment.storage0Syze,
            storage1Type: equipment.storage1Type,
            storage1Syze: equipment.storage1Syze,
          },
        },
        department: {
          id: equipment.department ? equipment.department.id : null,
          name: equipment.department ? equipment.department.name : null,
        },
        currentUser: null,
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
      type: equipment.type,
      status: equipment.status,
      serviceTag: equipment.serviceTag,
      patrimony: equipment.patrimony,
      brand: equipment.brand,
      model: equipment.model,
      purchase: {
        supplier: equipment.supplier,
        invoice: equipment.invoice,
        warranty: equipment.warranty,
        purchaseDate: equipment.purchaseDate,
      },
      config: {
        cpu: equipment.cpu,
        ram: equipment.ram,
        video: equipment.video,
        storage: {
          slots: equipment.slots,
          storage0Type: equipment.storage0Type,
          storage0Syze: equipment.storage0Syze,
          storage1Type: equipment.storage1Type,
          storage1Syze: equipment.storage1Syze,
        },
      },
      department: {
        id: equipment.department ? equipment.department.id : null,
        name: equipment.department ? equipment.department.name : null,
      },
      currentUser: null,
    });
  }

  async findByDepartmentId(
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
        type: equipment.type,
        status: equipment.status,
        serviceTag: equipment.serviceTag,
        patrimony: equipment.patrimony,
        brand: equipment.brand,
        model: equipment.model,
        purchase: {
          supplier: equipment.supplier,
          invoice: equipment.invoice,
          warranty: equipment.warranty,
          purchaseDate: equipment.purchaseDate,
        },
        config: {
          cpu: equipment.cpu,
          ram: equipment.ram,
          video: equipment.video,
          storage: {
            slots: equipment.slots,
            storage0Type: equipment.storage0Type,
            storage0Syze: equipment.storage0Syze,
            storage1Type: equipment.storage1Type,
            storage1Syze: equipment.storage1Syze,
          },
        },
        department: {
          id: equipment.department ? equipment.department.id : null,
          name: equipment.department ? equipment.department.name : null,
        },
        currentUser: null,
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
        purchaseDate: equipment.purchaseDate,
        status: equipment.status,
        cpu: equipment.cpu,
        ram: equipment.ram,
        slots: equipment.slots,
        storage0Type: equipment.storage0Type,
        storage0Syze: equipment.storage0Syze,
        storage1Type: equipment.storage1Type,
        storage1Syze: equipment.storage1Syze,
        video: equipment.video,
        serviceTag: equipment.serviceTag,
        department: {
          id: equipment.departmentId,
        },
      },
    );
  }
}
