import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { Equipment } from '../../../core/entity/equipment';

export class CreateEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepositoryInterface) {}

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
    const equipmentAlreadyExits = await this.equipmentRepository.findById(id);

    if (equipmentAlreadyExits) {
      throw new Error('Department already exits');
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
};
