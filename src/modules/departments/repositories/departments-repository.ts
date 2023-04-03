import { Department } from '../entities/department';

export abstract class DepartmentsRepository {
  abstract create(department: Department);
  abstract findAll();
  abstract findByName(name: string);
}
