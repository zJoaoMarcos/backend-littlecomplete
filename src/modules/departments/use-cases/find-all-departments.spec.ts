import { InMemoryDepartmentsRepository } from '../repositories/in-memory/in-memory-departments-repository';
import { CreateDepartmentUseCase } from './create-departments';
import { FindAllDepartmentsUseCase } from './find-all-departments';
describe('Find All Departments Use Case', () => {
  it('should be able to find all departments', async () => {
    const departmentsRepository = new InMemoryDepartmentsRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    const findAllDepartments = new FindAllDepartmentsUseCase(
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

    expect(() => findAllDepartments.execute()).resolves;
  });
});
