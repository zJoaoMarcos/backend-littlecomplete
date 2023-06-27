import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';
import { DepartmentNotFoundError } from './errors/department-not-found-error';
import { DirectBossNotFoundError } from './errors/direct-boss-not-found-error';
import { UserNameAlreadyExistsError } from './errors/user-name-already-exits-error';
import { makeCreateDepartment } from './factories/make-create-department';
import { makeCreateUser } from './factories/make-create-user';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new CreateUserUseCase(usersRepository, departmentsRepository);
  });

  it('should be able create a new user', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.smith' }));

    const { user } = await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 2,
      telephone: null,
      direct_boss: 'jhon.smith',
      smtp: 'jhon.doe@email.com',
    });

    expect(user).toBeTruthy();
  });

  it('should not be able create a new User with department not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.smith' }));

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 1,
        telephone: null,
        direct_boss: 'jhon.smith',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('should not be able create a new User with duplicate user_name', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.smith' }));
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 2,
        telephone: null,
        direct_boss: 'Martin Fowler',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(UserNameAlreadyExistsError);
  });

  it('Should not be able create User with direct boss not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.smith' }));

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 2,
        telephone: null,
        direct_boss: 'Martin Fowler',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(DirectBossNotFoundError);
  });
});
