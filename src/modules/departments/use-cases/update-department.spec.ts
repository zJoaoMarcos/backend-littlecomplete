import { InMemoryDepartmentsRepository } from '../repositories/in-memory/in-memory-departments-repository';
import { CreateDepartmentUseCase } from './create-departments';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';
import { UpdateDepartmentUseCase } from './update-department';

describe('Update Department Use Case', () => {
  it('should be able to update department props', async () => {
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    const updateDepartment = new UpdateDepartmentUseCase(departmentsRepository);

    await createDepartment.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await createDepartment.execute({
      name: 'SI',
      cost_center: 24242,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await createDepartment.execute({
      name: 'Tecnologia da Informação',
      cost_center: 24204242,
      is_board: true,
      board: 'Tecnologia da Informação',
    });

    expect(() => updateDepartment.execute('IOT', { name: 'AI' })).resolves;
  });

  it('should not be able to update department with an existing name', async () => {
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    const updateDepartment = new UpdateDepartmentUseCase(departmentsRepository);

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

    expect(() =>
      updateDepartment.execute('IOT', {
        name: 'SI',
        cost_center: 424343434,
        is_board: false,
        board: 'Diretoria Financeira',
      }),
    ).rejects.toBeInstanceOf(DepartmentAlreadyExistsError);
  });
});
