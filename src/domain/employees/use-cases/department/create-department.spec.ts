import { DepartmentAlreadyExistsError } from '@/errors/department-already-exits-error';
import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { CreateDepartmentUseCase } from './create-department';

let departmentsRepository: InMemoryDepartmentRepository;
let sut: CreateDepartmentUseCase;

describe('Create Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new CreateDepartmentUseCase(departmentsRepository);
  });
  it('should be able to create department', async () => {
    expect(() =>
      sut.execute({
        name: 'IOT',
        cost_center: 2420424,
        is_board: false,
        board: 'Tecnologia da Informação',
      }),
    ).resolves;
  });

  it('should not be able to create department with same name twice', async () => {
    const name = 'IOT';

    await sut.execute({
      name,
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await expect(() =>
      sut.execute({
        name,
        cost_center: 22345,
        is_board: true,
        board: 'Tecnologia da Informação',
      }),
    ).rejects.toBeInstanceOf(DepartmentAlreadyExistsError);
  });
});
