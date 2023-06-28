import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { EditDepartmentUseCase } from './edit-department';
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error';
import { ResponsibleNotFoundError } from './errors/responsible-not-found-error';
import { makeCreateDepartment } from './factories/make-create-department';
import { makeCreateUser } from './factories/make-create-user';

let departmentsRepository: InMemoryDepartmentRepository;
let usersRepository: InMemoryUserRepository;
let sut: EditDepartmentUseCase;

describe('Edit Department Use Case', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentRepository();
    usersRepository = new InMemoryUserRepository();
    sut = new EditDepartmentUseCase(departmentsRepository, usersRepository);
  });

  it('should be able to edit an department', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 4 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'generic-responsible' }),
    );

    const { department } = await sut.execute({
      id: 4,
      name: 'generic-name',
      board: 'generic-board',
      cost_center: 24332,
      is_board: false,
      responsible_id: 'generic-responsible',
    });

    expect(department).toBeTruthy();
    expect(department.name).toEqual('generic-name');
  });

  it('should not be able to update department with responsible id not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 4 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'generic-responsible' }),
    );

    expect(() =>
      sut.execute({
        id: 4,
        name: 'generic-name',
        board: 'generic-board',
        cost_center: 24332,
        is_board: false,
        responsible_id: 'responsible-not-registered',
      }),
    ).rejects.toBeInstanceOf(ResponsibleNotFoundError);
  });

  it('should not be able to update department with name twice', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 4 }));
    departmentsRepository.departments.push(
      makeCreateDepartment({ name: 'name-twice' }),
    );
    usersRepository.users.push(
      makeCreateUser({ user_name: 'generic-responsible' }),
    );

    expect(() =>
      sut.execute({
        id: 4,
        name: 'name-twice',
        board: 'generic-board',
        cost_center: 24332,
        is_board: false,
        responsible_id: 'generic-responsible ',
      }),
    ).rejects.toBeInstanceOf(DepartmentAlreadyExistsError);
  });
});
