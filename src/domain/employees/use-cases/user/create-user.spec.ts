import { Department } from 'src/domain/entity/department';
import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { UserNameAlreadyExistsError } from '../errors/user-name-already-exits-error';
import { CreateUserUseCase } from './create-user';

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
    const department = Department.create({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    departmentsRepository.departments.push(department);

    const { user } = await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'IOT',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: new Date(),
      demission_date: null,
      status: 'vacation',
    });

    expect(user.props.status).toEqual('vacation');
  });

  it('should not be able create a new User with department not registered', async () => {
    const department = Department.create({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    departmentsRepository.departments.push(department);

    await expect(() =>
      sut.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'CTO',
        department_id: 'SI',
        telephone: null,
        direct_boss: 'Martin Fowler',
        smtp: 'jhon.doe@email.com',
        admission_date: new Date(),
        demission_date: null,
        status: 'vacation',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('should not be able create a new User with duplicate user_name', async () => {
    const department = Department.create({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    departmentsRepository.departments.push(department);

    await sut.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'TI',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jane.doe@email.com',
      admission_date: new Date(),
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
        admission_date: new Date(),
        demission_date: null,
        status: 'vacation',
      }),
    ).rejects.toBeInstanceOf(UserNameAlreadyExistsError);
  });
});
