import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from '@/domain/employees/use-cases/errors/department-not-found-error';
import { Equipment } from '@/domain/inventory/entity/equipment';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { EquipmentAlreadyExistsError } from '../errors/equipment-already-exits-error';

export class CreateEquipmentUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    id,
    brand,
    model,
    type,
    currentUser,
    departmentId,
    patrimony,
    supplier,
    invoice,
    warranty,
    purchaseDate,
    cpu,
    ram,
    slots,
    storage0Type,
    storage0Syze,
    storage1Type,
    storage1Syze,
    video,
    serviceTag,
  }: CreateEquipmentInput): Promise<CreateEquipmentOutput> {
    const equipmentAlreadyExists = await this.equipmentRepository.findById(id);

    if (equipmentAlreadyExists) {
      throw new EquipmentAlreadyExistsError();
    }

    const departmentExists = await this.departmentRepository.findById(
      departmentId,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const departmentName = departmentExists.name;

    const equipment = Equipment.create({
      id,
      brand,
      model,
      status: 'available',
      type,
      patrimony,
      currentUser,
      serviceTag,
      department: {
        id: departmentId,
        name: departmentName,
      },
      purchase: {
        purchaseDate,
        warranty,
        supplier,
        invoice,
      },
      config: {
        cpu,
        ram,
        video,
        storage: {
          slots,
          storage0Type,
          storage0Syze,
          storage1Type,
          storage1Syze,
        },
      },
    });

    await this.equipmentRepository.create(equipment);

    return {
      equipment,
    };
  }
}

type CreateEquipmentInput = {
  id: string;
  brand: string | null;
  patrimony: string;
  type: string;
  model: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchaseDate: Date | null;
  departmentId: number | null;
  currentUser: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0Type: string | null;
  storage0Syze: number | null;
  storage1Type: string | null;
  storage1Syze: number | null;
  video: string | null;
  serviceTag: string | null;
};

type CreateEquipmentOutput = {
  equipment: Equipment;
};
