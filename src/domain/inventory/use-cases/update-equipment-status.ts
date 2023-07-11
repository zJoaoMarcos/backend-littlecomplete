/* eslint-disable prefer-const */
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

    const isEquipmentInUse = equipment.status === 'in use';

    let updatedEquipment = equipment;

    if (status === 'maintenance') {
      updatedEquipment.status = status;

      await this.equipmentRepository.save(updatedEquipment);

      console.log(equipment.props.status, updatedEquipment.props.status);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${updatedEquipment.props.status}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: updatedEquipment };
    }

    if (status === 'available' && !isEquipmentInUse) {
      updatedEquipment.status = status;

      await this.equipmentRepository.save(updatedEquipment);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${updatedEquipment.props.status}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: updatedEquipment };
    }

    if (status === 'disabled' && !isEquipmentInUse) {
      updatedEquipment.status = status;

      await this.equipmentRepository.save(updatedEquipment);

      const action = Auditory.create({
        id: randomUUID(),
        type: 'PATCH',
        module: 'Inventory',
        form: 'update-equipment-status',
        description: `the equipment ${equipment.props.id} with status: ${equipment.props.status} has been updated to: ${updatedEquipment.props.status}`,
        createdBy,
        createdAt: new Date(),
      });

      await this.auditoryRepository.create(action);

      return { equipment: updatedEquipment };
    }

    throw new InvalidStatusRequestError();
  }
}
