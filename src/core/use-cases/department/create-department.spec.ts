import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { CreateDepartmentUseCase } from './create-department';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';

describe('Create Department Use Case', () => {
  it('should be able to create department', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    expect(() =>
      createDepartmentUseCase.execute({
        name: 'IOT',
        cost_center: 2420424,
        is_board: false,
        board: 'Tecnologia da Informação',
      }),
    ).resolves;
  });

  it('should not be able to create department with same name twice', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    const name = 'IOT';

    await createDepartmentUseCase.execute({
      name,
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    expect(() =>
      createDepartmentUseCase.execute({
        name,
        cost_center: 22345,
        is_board: true,
        board: 'Tecnologia da Informação',
      }),
    ).rejects.toBeInstanceOf(DepartmentAlreadyExistsError);
  });
});
