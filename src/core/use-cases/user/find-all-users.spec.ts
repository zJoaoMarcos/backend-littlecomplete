import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { CreateUserUseCase } from './create-user';
import { FindAllUsersUseCase } from './find-all-users';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let createUser: CreateUserUseCase;
let sut: FindAllUsersUseCase;

describe('Find All Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    createUser = new CreateUserUseCase(usersRepository, departmentsRepository);
    sut = new FindAllUsersUseCase(usersRepository);
  });

  it('should be able to find all users', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
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
      smtp: 'jhon.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });
    await createUser.execute({
      user_name: 'jane.doe',
      complete_name: 'jane Doe',
      title: 'CTO',
      department_id: 'IOT',
      telephone: null,
      direct_boss: 'Martin Fowler',
      smtp: 'jane.doe@email.com',
      admission_date: '18/05/2002',
      demission_date: null,
      status: 'active',
    });

    expect(() => sut.execute()).resolves;
  });
});
