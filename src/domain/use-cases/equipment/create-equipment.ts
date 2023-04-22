import { Equipment } from '../../../core/entity/equipment';
import { DepartmentRepositoryInterface } from '../../../core/repository/department-repository';
import { EquipmentRepositoryInterface } from '../../../core/repository/equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { EquipmentAlreadyExistsError } from '../errors/equipment-already-exits-error';

export class CreateEquipmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepositoryInterface,
    private departmentRepository: DepartmentRepositoryInterface,
  ) {}

  async execute({
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
  }: CreateEquipmentInput): Promise<CreateEquipmentOutput> {
    const equipmentAlreadyExists = await this.equipmentRepository.findById(id);

    if (equipmentAlreadyExists) {
      throw new EquipmentAlreadyExistsError();
    }

    const departmentExists = await this.departmentRepository.findByName(
      department,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const equipment = new Equipment(
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
    );

    await this.equipmentRepository.create(
      equipment.id,
      equipment.brand,
      equipment.model,
      equipment.department,
      equipment.status,
      equipment.supplier,
      equipment.invoice,
      equipment.warranty,
      equipment.purchase_date,
      equipment.cpu,
      equipment.ram,
      equipment.slots,
      equipment.storage0_type,
      equipment.storage0_syze,
      equipment.storage1_type,
      equipment.storage1_syze,
      equipment.video,
      equipment.service_tag,
    );

    return {
      equipment,
    };
  }
}

type CreateEquipmentInput = {
  id: string;
  brand: string;
  model: string;
  supplier?: string;
  invoice?: string;
  warranty?: string;
  purchase_date?: string;
  department: string;
  status: string;
  cpu?: string;
  ram?: string;
  slots?: number;
  storage0_type?: string;
  storage0_syze?: number;
  storage1_type?: string;
  storage1_syze?: number;
  video?: string;
  service_tag?: string;
};

type CreateEquipmentOutput = {
  equipment: {
    id: string;
    brand: string;
    model: string;
    supplier: string;
    invoice: string | null;
    warranty: string | null;
    purchase_date: string | null;
    department: string;
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
