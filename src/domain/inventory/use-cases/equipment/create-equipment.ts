import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from '@/domain/errors/department-not-found';
import { EquipmentAlreadyExistsError } from '@/domain/errors/equipment-already-exits-error';
import { Equipment } from '@/domain/inventory/entity/equipment';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';

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

    const departmentName = departmentExists.name;

    const equipment = Equipment.create({
      id,
      brand,
      model,
      department: {
        id: department_id,
        name: departmentName,
      },
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
      department: { id: number; name: string };
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
