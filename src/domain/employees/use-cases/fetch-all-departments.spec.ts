import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { Department } from '../entity/department';
import { CreateDepartmentUseCase } from './create-department';
import { makeCreateDepartment } from './factories/make-create-department';
import { FetchAllDepartmentsUseCase } from './fetch-all-departments';

let departmentsRepository: InMemoryDepartmentRepository;
let createDepartment: CreateDepartmentUseCase;
let sut: FetchAllDepartmentsUseCase;

describe('Find All Departments Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new FetchAllDepartmentsUseCase(departmentsRepository);
  });
  it('should be able to find all departments', async () => {
    departmentsRepository.departments.push(
      makeCreateDepartment(),
      makeCreateDepartment(),
      makeCreateDepartment(),
    );

    const { departments, totalCount } = await sut.execute({
      params: {},
    });

    expect(departments[0]).toBeInstanceOf(Department);
    expect(totalCount).toEqual(3);
  });
});
