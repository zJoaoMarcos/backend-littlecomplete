import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { DepartmentAlreadyExistsError } from '../errors/department-already-exits-error';
import { CreateDepartmentUseCase } from './create-department';
import { UpdateDepartmentUseCase } from './update-department';

let departmentRepository: InMemoryDepartmentRepository;
let sut: UpdateDepartmentUseCase;

describe('Update Department Use Case', () => {
  beforeEach(() => {
    departmentRepository = new InMemoryDepartmentRepository();
    sut = new UpdateDepartmentUseCase(departmentRepository);
  });

  it('should be able to update department props', async () => {
    await departmentRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await departmentRepository.departments.push({
      name: 'SI',
      cost_center: 24242,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await departmentRepository.departments.push({
      name: 'Tecnologia da Informação',
      cost_center: 24204242,
      is_board: true,
      board: 'Tecnologia da Informação',
    });

    const { department } = await sut.execute('IOT', { name: 'AI' });

    expect(department.name).toEqual('AI');
  });

  it('should not be able to update department with an existing name', async () => {
    const departmentRepository = new InMemoryDepartmentRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentRepository);
    const updateDepartment = new UpdateDepartmentUseCase(departmentRepository);

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
