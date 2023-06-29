import { InMemoryAdministratorRepository } from '@/infra/repository/in-memory/in-memory-administrator-repository';
import { Administrator } from '../entity/administrator';
import { RegisterAdministratorUseCase } from './register-administrator';

let administratorRepository: InMemoryAdministratorRepository;
let sut: RegisterAdministratorUseCase;

describe('Register Administrator Use Case', () => {
  administratorRepository = new InMemoryAdministratorRepository();
  sut = new RegisterAdministratorUseCase(administratorRepository);

  it('Should be able register new administrator', async () => {
    const { administrator } = await sut.execute({
      email: 'jhon.doe@email.com',
      displayName: 'Jhon Doe',
      password: 'random-password',
    });

    expect(administrator).toBeInstanceOf(Administrator);
    expect(administrator.username).toEqual('jhon.doe');
  });

  it('Should not be able to register new administrator with email twice');
});
