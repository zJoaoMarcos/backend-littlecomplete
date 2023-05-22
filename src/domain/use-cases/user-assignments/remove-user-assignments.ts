import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class RemoveEquipmentAssignmentUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ username }: Request) {
    const user = await this.userRepository.findByUserName(username);
    if (!user) {
      throw new UserNotFoundError();
    }

    await this.userAssignmentRepository.deleteManyByUserName(user.user_name);

    return {};
  }
}

type Request = {
  username: string;
};
