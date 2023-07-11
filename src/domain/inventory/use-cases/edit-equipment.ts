import { randomUUID } from 'node:crypto';

import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from '@/domain/employees/use-cases/errors/department-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { Equipment } from '../entity/equipment';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

interface UpdateEquipmentRequest {
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
  createdBy: string;
}

interface UpdateUserStatusResponse {
  equipment: Equipment;
}

export class EditEquipmentUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentRepository: IDepartmentRepository,
    private auditoryRepository: IAuditoryRepository,
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
    createdBy,
  }: UpdateEquipmentRequest): Promise<UpdateUserStatusResponse> {
    const equipment = await this.equipmentRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const updatedEquipment = equipment;

    if (departmentId !== equipment.departmentId) {
      const departmentExists = await this.departmentRepository.findById(
        departmentId,
      );

      if (!departmentExists) {
        throw new DepartmentNotFoundError();
      }

      updatedEquipment.departmentId = departmentId;
    }

    updatedEquipment.brand = brand;
    updatedEquipment.type = type;
    updatedEquipment.patrimony = patrimony;
    updatedEquipment.model = model;
    updatedEquipment.supplier = supplier;
    updatedEquipment.invoice = invoice;
    updatedEquipment.warranty = warranty;
    updatedEquipment.purchaseDate = purchaseDate;
    updatedEquipment.status = status;
    updatedEquipment.cpu = cpu;
    updatedEquipment.ram = ram;
    updatedEquipment.slots = slots;
    updatedEquipment.serviceTag = serviceTag;
    updatedEquipment.storage0Syze = storage0Syze;
    updatedEquipment.storage0Type = storage0Type;
    updatedEquipment.storage1Syze = storage1Syze;
    updatedEquipment.storage1Type = storage1Type;
    updatedEquipment.video = video;

    await this.equipmentRepository.save(updatedEquipment);

    const action = Auditory.create({
      id: randomUUID(),
      type: 'PATCH',
      module: 'Inventory',
      form: 'update-equipment',
      description: `the equipment: ${JSON.stringify(
        equipment.props,
      )}, has been updated to ${JSON.stringify(updatedEquipment.props)}`,
      createdBy,
      createdAt: new Date(),
    });

    await this.auditoryRepository.create(action);

    return {
      equipment,
    };
  }
}
