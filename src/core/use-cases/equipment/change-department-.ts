import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';

export class updateEquipmentDepartment {
  constructor(private equipmentRepository: EquipmentRepositoryInterface) {}

  async execute() {
    const equipmentAlreadyExits = this.equipmentRepository.update();
  }
}
