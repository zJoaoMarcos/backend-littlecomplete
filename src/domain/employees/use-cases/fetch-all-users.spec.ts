import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { User } from '../entity/user';
import { makeCreateUser } from './factories/make-create-user';
import { FetchAllUsersUseCase } from './fetch-all-users';

let usersRepository: InMemoryUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: FetchAllUsersUseCase;

describe('Find All Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new FetchAllUsersUseCase(usersRepository);
  });

  it('should be able to find all users', async () => {
    await usersRepository.users.push(
      makeCreateUser(),
      makeCreateUser(),
      makeCreateUser(),
    );

    const { users, totalCount } = await sut.execute({ params: {} });

    expect(users[0]).toBeInstanceOf(User);
    expect(totalCount).toEqual(3);
  });
});
