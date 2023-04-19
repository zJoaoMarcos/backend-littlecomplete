import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { CreateUserUseCase } from './create-user';
import { UpdateUserDepartementUseCase } from './update-user-department';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let createUser: CreateUserUseCase;
let sut: UpdateUserDepartementUseCase;

describe('Update User Department Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    createUser = new CreateUserUseCase(usersRepository, departmentsRepository);
    sut = new UpdateUserDepartementUseCase(
      usersRepository,
      departmentsRepository,
    );
  });

  it('should update user department', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await departmentsRepository.departments.push({
      name: 'SI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await createUser.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'IOT',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jane.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });

    const { user } = await sut.execute('jhon.doe', 'IOT');
    expect(user.department_id).toEqual('IOT');
  });

  it('should  not be able update User Department with Department noexistent', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await departmentsRepository.departments.push({
      name: 'SI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await createUser.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department_id: 'IOT',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jane.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });

    expect(() => sut.execute('jhon.doe', 'DEV OPS')).rejects.toBeInstanceOf(
      DepartmentNotFoundError,
    );
  });
});
