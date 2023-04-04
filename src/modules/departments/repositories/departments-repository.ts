import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department';

export abstract class DepartmentsRepository {
  abstract create(department: Department);
  abstract findAll();
  abstract findByName(name: string);
  abstract update(name: string, deparment: UpdateDepartmentDto);
}
