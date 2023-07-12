import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { randomUUID } from 'crypto';
import { Equipment } from '../entity/equipment';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

interface RemoveEquipmentAssignmentRequest {
  equipmentId: string;
  createdBy: string;
}
interface RemoveEquipmentAssignmentResponse {
  equipment: Equipment;
}

export class RemoveEquipmentAssignmentUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private equipmentRepository: IEquipmentRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    equipmentId,
    createdBy,
  }: RemoveEquipmentAssignmentRequest): Promise<RemoveEquipmentAssignmentResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const user = await this.userAssignmentRepository.findByEquipmentId(
      equipment.id,
    );

    const oldUser = JSON.parse(JSON.stringify(user.props.user_name));

    await this.userAssignmentRepository.deleteByEquipmentId(equipment.id);

    equipment.status = 'pendency';

    await this.equipmentRepository.save(equipment);

    const action = Auditory.create({
      id: randomUUID(),
      type: 'DELETE',
      form: 'remove-equipment-assignment',
      module: 'Inventory',
      description: `the equipment: ${JSON.stringify(
        equipment.props,
      )} has been unassigned from employee: ${oldUser}`,
      createdBy,
      createdAt: new Date(),
    });

    await this.auditoryRepository.create(action);

    return { equipment };
  }
}
