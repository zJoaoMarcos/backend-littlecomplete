/* eslint-disable @typescript-eslint/ban-types */
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateStatusUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
  ) {}

  async execute({
    status,
    username,
  }: UpdateStatusInput): Promise<UpdateStatusOutput> {
    const user = await this.userRepository.findByUserName(username);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (status === 'disabled') {
      user.status = status;

      /*  await this.userAssignmentsRepository.deleteManyByUserName(user.user_name);  */ // TODO: after disable add Equipments and other assignments in the Next Tasks

      await this.userRepository.save(user);

      return {};
    }

    user.status = status;

    await this.userRepository.save(user);

    return {};
  }
}

type UpdateStatusInput = {
  username: string;
  status: string;
};

type UpdateStatusOutput = {};
