import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { AssignTelephoneForUserUseCase } from './assign-telephone-for-user';
import { CreateUserUseCase } from './create-user';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let createUser: CreateUserUseCase;
let sut: AssignTelephoneForUserUseCase;

describe('Assign Telephone For User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    createUser = new CreateUserUseCase(usersRepository, departmentsRepository);
    sut = new AssignTelephoneForUserUseCase(usersRepository);
  });

  it('should be able assign telephone for user', async () => {
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
      smtp: 'jane.doe@email.com',
      admission_date: '18/04/2000',
      demission_date: null,
      status: 'vacation',
    });

    const { updatedUser } = await sut.execute('jhon.doe', 4009);
    expect(updatedUser.telephone).toEqual(4009);
  });
});
