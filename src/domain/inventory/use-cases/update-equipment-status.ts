import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { randomUUID } from 'crypto';
import { Equipment } from '../entity/equipment';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';
import { InvalidStatusRequestError } from './errors/invalid-status-request-error';

interface UpdateStatusRequest {
  equipment_id: string;
  status: string;
  createdBy: string;
}

interface UpdateStatusOutput {
  equipment: Equipment;
}

export class UpdateEquipmentStatusUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    equipment_id,
    status,
    createdBy,
  }: UpdateStatusRequest): Promise<UpdateStatusOutput> {
    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const oldEquipmentStatus: Equipment = JSON.parse(
      JSON.stringify(equipment.props.status),
    );

    const isEquipmentInUse = equipment.status === 'in use';

    if (status === 'maintenance') {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${oldEquipmentStatus}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: equipment };
    }

    if (status === 'available' && !isEquipmentInUse) {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${oldEquipmentStatus}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: equipment };
    }

    if (status === 'disabled' && !isEquipmentInUse) {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${oldEquipmentStatus}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: equipment };
    }

    throw new InvalidStatusRequestError();
  }
}
