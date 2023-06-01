/* eslint-disable @typescript-eslint/ban-types */
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from '@/domain/errors/department-not-found';
import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';

export class EditEquipmentUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    id,
    brand,
    model,
    department_id,
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
  }: UpdateEquipmentInput): Promise<UpdateUserStatusOutput> {
    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      return new DepartmentNotFoundError();
    }

    equipment.brand = brand;
    equipment.model = model;
    equipment.supplier = supplier;
    equipment.invoice = invoice;
    equipment.warranty = warranty;
    equipment.purchase_date = purchase_date;
    equipment.department_id = department_id;
    equipment.status = status;
    equipment.cpu = cpu;
    equipment.ram = ram;
    equipment.slots = slots;
    equipment.service_tag = service_tag;
    equipment.storage0_syze = storage0_syze;
    equipment.storage0_type = storage0_type;
    equipment.storage1_syze = storage1_syze;
    equipment.storage1_type = storage1_type;
    equipment.video = video;

    await this.equipmentRepository.save(equipment);

    return {};
  }
}

type UpdateEquipmentInput = {
  id: string;
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

type UpdateUserStatusOutput = {};
