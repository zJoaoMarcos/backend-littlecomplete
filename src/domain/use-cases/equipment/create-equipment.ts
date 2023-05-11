import { Equipment } from '../../../domain/entity/equipment';
import { IDepartmentRepository } from '../../../domain/repository/department-repository';
import { IEquipmentRepository } from '../../../domain/repository/equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
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
    department_id,
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
  }: CreateEquipmentInput): Promise<CreateEquipmentOutput> {
    const equipmentAlreadyExists = await this.equipmentRepository.findById(id);

    if (equipmentAlreadyExists) {
      throw new EquipmentAlreadyExistsError();
    }

    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const equipment = Equipment.create({
      id,
      brand,
      model,
      department_id,
      status: 'available',
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

    await this.equipmentRepository.create(equipment);

    return {
      equipment,
    };
  }
}

type CreateEquipmentInput = {
  id: string;
  brand: string;
  model: string;
  supplier: string;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department_id: number;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
};

type CreateEquipmentOutput = {
  equipment: {
    props: {
      id: string;
      type: string | null;
      brand: string;
      model: string;
      supplier: string;
      invoice: string | null;
      warranty: string | null;
      purchase_date: Date | null;
      department_id: number;
      status: string;
      cpu: string | null;
      ram: string | null;
      slots: number | null;
      storage0_type: string | null;
      storage0_syze: number | null;
      storage1_type: string | null;
      storage1_syze: number | null;
      video: string | null;
      service_tag: string | null;
    };
  };
};
