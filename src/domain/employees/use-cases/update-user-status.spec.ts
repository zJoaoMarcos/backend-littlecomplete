import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { InvalidStatusRequestError } from './errors/invalid-status-request-error';
import { makeCreateUser } from './factories/make-create-user';
import { UpdateUserStatusUseCase } from './update-user-status';

let usersRepository: InMemoryUserRepository;
let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let sut: UpdateUserStatusUseCase;

describe('Update User Status Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    sut = new UpdateUserStatusUseCase(
      usersRepository,
      userAssignmentsRepository,
      equipmentsRepository,
    );
  });

  it('should be able update user status ', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));

    const { user } = await sut.execute({
      status: 'active',
      username: 'jhon.doe',
    });

    expect(user).toBeTruthy();
    expect(user.status).toEqual('active');
  });

  it('should not be able to update an user with invalid status', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));

    expect(() =>
      sut.execute({
        status: 'invalid-status',
        username: 'jhon.doe',
      }),
    ).rejects.toBeInstanceOf(InvalidStatusRequestError);
  });

  it('Should not be able update User status to disabled when user has assignments', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));
  });

  /*
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
  }); */
});
