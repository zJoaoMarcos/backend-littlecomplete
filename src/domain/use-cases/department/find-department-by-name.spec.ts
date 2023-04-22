import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { CreateDepartmentUseCase } from './create-department';
import { FindByNameDepartmentUseCase } from './find-department-by-name';

let departmentsRepository: InMemoryDepartmentRepository;
let createDepartment: CreateDepartmentUseCase;
let sut: FindByNameDepartmentUseCase;

describe('Find Department By Name Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    sut = new FindByNameDepartmentUseCase(departmentsRepository);
  });
  it('should be able to find department by name', async () => {
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

    await expect(() => sut.execute('IOT')).resolves;
  });

  it('should not be able to find department by name with name inexisting', async () => {
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

    await expect(() => sut.execute('name-not-exists')).rejects.toBeInstanceOf(
      DepartmentNotFoundError,
    );
  });
});
