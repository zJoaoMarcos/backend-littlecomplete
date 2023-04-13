import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';

export class updateEquipmentDepartmentUseCase {
  constructor(
    private equipmentRepository: EquipmentRepositoryInterface,
    private departmentsRepository: DepartmentRepositoryInterface,
  ) {}

  async execute({ id, department }: UpdateEquipmentDepartmentInput) {
    const equipmentExists = await this.equipmentRepository.findById(id);

    if (!equipmentExists) {
      throw new Error('Equipment not Found');
    }

    const departmentExists = await this.departmentsRepository.findByName(
      department,
    );

    if (!departmentExists) {
      throw new Error('Department dont exists');
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
  id: string;
  department: string;
};
