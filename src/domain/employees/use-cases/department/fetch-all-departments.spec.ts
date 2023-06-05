import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { CreateDepartmentUseCase } from './create-department';
import { FindAllDepartmentsUseCase } from './find-all-departments';

let departmentsRepository: InMemoryDepartmentRepository;
let createDepartment: CreateDepartmentUseCase;
let sut: FindAllDepartmentsUseCase;

describe('Find All Departments Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    sut = new FindAllDepartmentsUseCase(departmentsRepository);
  });
  it('should be able to find all departments', async () => {
    await createDepartment.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await createDepartment.execute({
      name: 'SI',
      cost_center: 2420,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await createDepartment.execute({
      name: 'Tecnologia da Informação',
      cost_center: 2420424,
      is_board: true,
      board: 'Tecnologia da Informação',
    });

    expect(() => sut.execute()).resolves;
  });
});
