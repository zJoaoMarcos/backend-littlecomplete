import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepoitory } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { UserNameAlreadyExistsError } from '../errors/user-name-already-exits-error';
import { CreateUserUseCase } from './create-user';

let usersRepository: InMemoryUserRepoitory;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepoitory();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new CreateUserUseCase(usersRepository, departmentsRepository);
  });

  it('should be able create a new user', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const { user } = await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'IOT',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });

    expect(user.status).toEqual('vacation');
  });

  it('should not be able create a new User with department not registered', async () => {
    await departmentsRepository.departments.push({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 'SI',
        telephone: null,
        direct_boss: 'Martin Fowler',
        smtp: 'jhon.doe@email.com',
        admission_date: '18/04/2000',
        demission_date: null,
        status: 'vacation',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('should not be able create a new User with duplicate user_name', async () => {
    await departmentsRepository.departments.push({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'TI',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jane.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 'TI',
        telephone: null,
        direct_boss: 'Martin Fowler',
        smtp: 'jhon.doe@email.com',
        admission_date: '18/04/2000',
        demission_date: null,
        status: 'vacation',
      }),
    ).rejects.toBeInstanceOf(UserNameAlreadyExistsError);
  });
});
