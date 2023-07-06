import * as bcrypt from 'bcrypt';

import { IAdministratorRepository } from '../repository/administrator.repository';
import { AdministratorNotFoundError } from './errors/administrator-not-found-error';
import { PasswordNotMatchError } from './errors/password-not-match-error';

interface UpdateAdministratorPasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export class UpdateAdministratorPasswordUseCase {
  constructor(private administratorService: IAdministratorRepository) {}

  async execute({
    email,
    currentPassword,
    newPassword,
  }: UpdateAdministratorPasswordRequest) {
    const administrator = await this.administratorService.findByEmail(email);

    if (!administrator) {
      throw new AdministratorNotFoundError();
    }

    const doesPasswordMatch = await bcrypt.compare(
      currentPassword,
      administrator.password,
    );

    const updatedPassword = await bcrypt.hash(newPassword, 10);

    if (!doesPasswordMatch) {
      throw new PasswordNotMatchError();
    }

    administrator.password = updatedPassword;
    await this.administratorService.save(administrator);

    return;
  }
}
