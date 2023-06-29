import { InMemoryAdministratorRepository } from '@/infra/repository/in-memory/in-memory-administrator-repository';
import { MakeRegisterAdministrator } from './factories/make-register-administrator';
import { FindAdministratorByEmailUseCase } from './find-administrator-by-email';

let administratorRepository: InMemoryAdministratorRepository;
let sut: FindAdministratorByEmailUseCase;

describe('Find By Administrator By Email Use Case', () => {
  beforeEach(() => {
    administratorRepository = new InMemoryAdministratorRepository();
    sut = new FindAdministratorByEmailUseCase(administratorRepository);
  });

  it('Should be able to find administrator by email', async () => {
    administratorRepository.items.push(
      MakeRegisterAdministrator({
        email: 'jhon.doe@email.com',
        username: 'Jhon Doe',
      }),
    );

    const { administrator } = await sut.execute({
      email: 'jhon.doe@email.com',
    });

    expect(administrator.username).toEqual('Jhon Doe');
  });
});
