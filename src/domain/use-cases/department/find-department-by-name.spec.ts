import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { CreateDepartmentUseCase } from './create-department';
import { FindByNameDepartmentUseCase } from './find-department-by-name';

describe('Find Department By Name Use Case', () => {
  it('should be able to find department by name', async () => {
    const departmentRepository = new InMemoryDepartmentRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentRepository);
    const findByNameDepartment = new FindByNameDepartmentUseCase(
      departmentRepository,
    );

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

    await expect(() => findByNameDepartment.execute('IOT')).resolves;
  });

  it('should not be able to find department by name with name inexisting', async () => {
    const departmentRepository = new InMemoryDepartmentRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentRepository);
    const findByNameDepartment = new FindByNameDepartmentUseCase(
      departmentRepository,
    );

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

    await expect(() =>
      findByNameDepartment.execute('name-not-exists'),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });
});
