import { InMemoryUsersRepository } from '../repositories/in-memory-repository.ts/in-memory-users-repository';
import { CreateUserUseCase } from './create-user';
import { UserAlreadyExistsError } from './error/user-already-exists-error';

describe('Create User Use Case', () => {
  it('should be able to create user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const admission_date = new Date();
    const demission_date = new Date();

    demission_date.setDate(demission_date.getDate() + 1);

    expect(() =>
      createUserUseCase.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'Developer Full Stack',
        department_id: 'IT',
        telephone: 4344,
        direct_boss: 'Carlos Alexandre',
        smtp: 'jhon.doe@example.com',
        admission_date,
        demission_date,
        status: 'active',
      }),
    ).resolves;
  });

  it('should not be able to create user with same name', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const admission_date = new Date();
    const demission_date = new Date();

    demission_date.setDate(demission_date.getDate() + 2);

    await createUserUseCase.execute({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'Developer Full Stack',
      department_id: 'IT',
      telephone: 4344,
      direct_boss: 'Carlos Alexandre',
      smtp: 'jhon.doe@example.com',
      admission_date,
      demission_date,
      status: 'active',
    });

    expect(() =>
      createUserUseCase.execute({
        user_name: 'jhon.doe',
        complete_name: 'Jhon Doe',
        title: 'Developer Full Stack',
        department_id: 'IT',
        telephone: 4344,
        direct_boss: 'Joe Schmoe',
        smtp: 'jhon.doe@example.com',
        admission_date,
        demission_date,
        status: 'active',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
