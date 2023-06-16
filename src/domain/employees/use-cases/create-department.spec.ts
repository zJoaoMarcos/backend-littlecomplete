import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { CreateDepartmentUseCase } from './create-department';
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error';
import { ResponsibleNotFoundError } from './errors/responsible-not-found-error';
import { makeCreateDepartment } from './factories/make-create-department';
import { makeCreateUser } from './factories/make-create-user';

let departmentsRepository: InMemoryDepartmentRepository;
let usersRepository: InMemoryUserRepository;
let sut: CreateDepartmentUseCase;

describe('Create Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    usersRepository = new InMemoryUserRepository();
    sut = new CreateDepartmentUseCase(departmentsRepository, usersRepository);
  });

  it('should be able to create department', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));

    const department = await sut.execute({
      name: 'generic-name',
      cost_center: 2420424,
      is_board: false,
      board: 'generic-board',
      responsible_id: 'jhon.doe',
    });

    expect(department).toBeTruthy();
  });

  it('should not be able to create department with responsible id not registered', async () => {
    await expect(() =>
      sut.execute({
        name: 'generic-name',
        cost_center: 2420424,
        is_board: false,
        board: 'generic-board',
        responsible_id: 'jhon.doe',
      }),
    ).rejects.toBeInstanceOf(ResponsibleNotFoundError);
  });

  it('should not be able to create department with name twice', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));
    departmentsRepository.departments.push(
      makeCreateDepartment({ name: 'generic-name' }),
    );

    await expect(() =>
      sut.execute({
        name: 'generic-name',
        cost_center: 2420424,
        is_board: false,
        board: 'generic-board',
        responsible_id: 'jhon.doe',
      }),
    ).rejects.toBeInstanceOf(DepartmentAlreadyExistsError);
  });
});
