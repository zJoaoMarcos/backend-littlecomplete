/* eslint-disable @typescript-eslint/ban-types */
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from '@/domain/employees/use-cases/errors/department-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

export class EditEquipmentUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    id,
    brand,
    type,
    patrimony,
    model,
    departmentId,
    status,
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
  }: UpdateEquipmentInput): Promise<UpdateUserStatusOutput> {
    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const departmentExists = await this.departmentRepository.findById(
      departmentId,
    );

    if (!departmentExists) {
      return new DepartmentNotFoundError();
    }

    equipment.brand = brand;
    equipment.type = type;
    equipment.patrimony = patrimony;
    equipment.model = model;
    equipment.supplier = supplier;
    equipment.invoice = invoice;
    equipment.warranty = warranty;
    equipment.purchaseDate = purchaseDate;
    equipment.departmentId = departmentId;
    equipment.status = status;
    equipment.cpu = cpu;
    equipment.ram = ram;
    equipment.slots = slots;
    equipment.serviceTag = serviceTag;
    equipment.storage0Syze = storage0Syze;
    equipment.storage0Type = storage0Type;
    equipment.storage1Syze = storage1Syze;
    equipment.storage1Type = storage1Type;
    equipment.video = video;

    await this.equipmentRepository.save(equipment);

    return {};
  }
}

type UpdateEquipmentInput = {
  id: string;
  type: string | null;
  brand: string | null;
  model: string | null;
  patrimony: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchaseDate: Date | null;
  departmentId: number;
  status: string;
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

type UpdateUserStatusOutput = {};
