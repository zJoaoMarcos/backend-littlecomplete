import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class updateEquipmentDepartmentUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private departmentsRepository: IDepartmentRepository,
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
