/* eslint-disable @typescript-eslint/ban-types */
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    status,
    username,
  }: UpdateStatusInput): Promise<UpdateStatusOutput> {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UserNotFoundError();
    }

    switch (status) {
      case 'disabled':
        user.status = status;
        break;
      case 'vacation':
        user.status = status;
        break;
      case 'active':
        user.status = status;
        break;
      default:
        throw new Error();
    }

    await this.userRepository.save(user);
    return {};
  }
}

type UpdateStatusInput = {
  username: string;
  status: string;
};

type UpdateStatusOutput = {};
