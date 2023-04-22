import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class updateEquipmentDepartmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepositoryInterface,
    private departmentsRepository: DepartmentRepositoryInterface,
  ) {}

  async execute(id: string, department: string) {
    const equipmentExists = await this.equipmentRepository.findById(id);

    if (!equipmentExists) {
      throw new EquipmentNotFoundError();
    }

    const departmentExists = await this.departmentsRepository.findByName(
      department,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const updatedEquipment = await this.equipmentRepository.update(
      id,
      department,
    );

    return {
      updatedEquipment,
    };
  }
}

type UpdateEquipmentDepartmentInput = {
  department: string;
};
