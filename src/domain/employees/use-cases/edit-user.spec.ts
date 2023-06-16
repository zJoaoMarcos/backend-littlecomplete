import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { EditUserUseCase } from './edit-user';
import { DepartmentNotFoundError } from './errors/department-not-found-error';
import { DirectBossNotFoundError } from './errors/direct-boss-not-found-error';
import { makeCreateDepartment } from './factories/make-create-department';
import { makeCreateUser } from './factories/make-create-user';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: EditUserUseCase;

describe('Edit User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new EditUserUseCase(usersRepository, departmentsRepository);
  });

  it('should be able to edit an user', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'jhon.smith' }),
      makeCreateUser({ user_name: 'jhon.doe' }),
    );

    const { user } = await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 2,
      telephone: null,
      direct_boss: 'jhon.smith',
      admission_date: new Date(),
      demission_date: null,
      smtp: 'jhon.doe31@email.com',
    });

    expect(user).toBeTruthy();
  });

  it('should not be able to update an user with department not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 1 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'jhon.smith' }),
      makeCreateUser({ user_name: 'jhon.doe' }),
    );

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 999,
        telephone: null,
        admission_date: new Date(),
        demission_date: null,
        direct_boss: 'jhon.smith',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('Should not be able update User with direct boss not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'jhon.smith' }),
      makeCreateUser({ user_name: 'jhon.doe' }),
    );

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 2,
        telephone: null,
        admission_date: new Date(),
        demission_date: null,
        direct_boss: 'jane.doe',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(DirectBossNotFoundError);
  });
  it('Should not be able update User with email twice', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 2 }));
    usersRepository.users.push(
      makeCreateUser({ user_name: 'jhon.smith' }),
      makeCreateUser({ user_name: 'jhon.doe' }),
    );

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 2,
        telephone: null,
        admission_date: new Date(),
        demission_date: null,
        direct_boss: 'jane.doe',
        smtp: 'jhon.doe@email.com',
      }),
    ).rejects.toBeInstanceOf(DirectBossNotFoundError);
  });
});
