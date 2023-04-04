import { InMemoryDepartmentsRepository } from '../repositories/in-memory/in-memory-departments-repository';
import { CreateDepartmentUseCase } from './create';
import { FindByNameDepartmentUseCase } from './find-by-name';

describe('Find Department By Name Use Case', () => {
  it('should be able to find department by name', async () => {
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    const findByNameDepartment = new FindByNameDepartmentUseCase(
      departmentsRepository,
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

    expect(() => findByNameDepartment.execute('IOT')).resolves;
  });
});
