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

    const oldEquipment = JSON.parse(JSON.stringify(equipment.props));

    if (departmentId !== equipment.departmentId) {
      const departmentExists = await this.departmentRepository.findById(
        departmentId,
      );

      if (!departmentExists) {
        throw new DepartmentNotFoundError();
      }
      equipment.departmentName = departmentExists.name;
      equipment.departmentId = departmentId;
    }

    equipment.brand = brand;
    equipment.type = type;
    equipment.patrimony = patrimony;
    equipment.model = model;
    equipment.supplier = supplier;
    equipment.invoice = invoice;
    equipment.warranty = warranty;
    equipment.purchaseDate = purchaseDate;
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

    const action = Auditory.create({
      id: randomUUID(),
      type: 'PATCH',
      module: 'Inventory',
      form: 'update-equipment',
      description: `the equipment: ${JSON.stringify(
        oldEquipment,
      )}, has been updated to ${JSON.stringify(equipment.props)}`,
      createdBy,
      createdAt: new Date(),
    });

    await this.auditoryRepository.create(action);

    return {
      equipment,
    };
  }
}
