import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { makeCreateUser } from './factories/make-create-user';
import { FindUserByUserNameUseCase } from './find-user-by-user-name';

let usersRepository: InMemoryUserRepository;
let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let sut: FindUserByUserNameUseCase;

describe('Find All Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    sut = new FindUserByUserNameUseCase(
      usersRepository,
      userAssignmentsRepository,
    );
  });

  it('should be able to find all users', async () => {
    usersRepository.users.push(
      makeCreateUser(),
      makeCreateUser({ user_name: 'jane.doe' }),
    );

    const { user } = await sut.execute({ userName: 'jane.doe' });

    expect(user.user_name).toEqual('jane.doe');
  });
});
