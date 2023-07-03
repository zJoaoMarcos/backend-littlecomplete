import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { Administrator } from '../entity/administrator';
import { IAdministratorRepository } from '../repository/administrator.repository';
import { AdministratorWithSameEmailAlreadyExistsError } from './errors/administrator-with-same-email-already-exists-error';

interface RegisterAdministratorRequest {
  email: string;
  displayName: string;
  password: string;
}

interface RegisterAdministratorResponse {
  administrator: Administrator;
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

    const passwordHashed = await bcrypt.hash(password, 10);

    const administrator = Administrator.create({
      id: randomUUID(),
      username: email.split('@')[0],
      email,
      displayName,
      password: passwordHashed,
    });

    await this.administratorRepository.create(administrator);

    administrator.password = undefined;

    return { administrator };
  }
}
