import { Department } from '../entities/department';

export abstract class DepartmentsRepository {
  abstract create(department: Department);
  abstract findByName(name: string);
}
