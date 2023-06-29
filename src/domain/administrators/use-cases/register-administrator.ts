import { randomUUID } from 'crypto';
import { Administrator } from '../entity/administrator';
import { IAdministratorRepository } from '../repository/administrator.repository';
import { AdministratorWithSameEmailAlreadyExistsError } from './errors/administrator-with-same-email-already-exists-error';

interface RegisterAdministratorRequest {
  email: string;
  displayName: string;
  password: string;
}

interface RegisterAdministratorResponse {
  administrator: Omit<Administrator, 'password'>;
}

export class RegisterAdministratorUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute({
    email,
    displayName,
    password,
  }: RegisterAdministratorRequest): Promise<RegisterAdministratorResponse> {
    const userWithSameEmail = await this.administratorRepository.findByEmail(
      email,
    );

    if (userWithSameEmail) {
      throw new AdministratorWithSameEmailAlreadyExistsError();
    }

    const administrator = Administrator.create({
      id: randomUUID(),
      username: email.split('@')[0],
      email,
      displayName,
      password,
    });

    return { administrator };
  }
}
