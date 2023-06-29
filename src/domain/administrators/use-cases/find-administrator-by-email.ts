import { Administrator } from '../entity/administrator';
import { IAdministratorRepository } from '../repository/administrator.repository';
import { AdministratorNotFoundError } from './errors/administrator-not-found-error';

interface FindAdministratorByEmailRequest {
  email: string;
}

interface FindAdministratorByEmailResponse {
  administrator: Administrator;
}

export class FindAdministratorByEmailUseCase {
  constructor(private administratorRepository: IAdministratorRepository) {}

  async execute({
    email,
  }: FindAdministratorByEmailRequest): Promise<FindAdministratorByEmailResponse> {
    const administrator = await this.administratorRepository.findByEmail(email);

    if (!administrator) {
      throw new AdministratorNotFoundError();
    }

    administrator.password = undefined;

    return { administrator };
  }
}
