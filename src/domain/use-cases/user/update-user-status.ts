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

    switch (status.toLocaleLowerCase()) {
      case 'disabled':
        user.status = status;
        await this.userRepository.save(user);
        break;
      case 'vacation':
        user.status = status;
        await this.userRepository.save(user);
        break;
      case 'active':
        user.status = status;
        await this.userRepository.save(user);
        break;
      default:
        throw new Error();
    }
    return {};
  }
}

type UpdateStatusInput = {
  username: string;
  status: string;
};

type UpdateStatusOutput = {};
