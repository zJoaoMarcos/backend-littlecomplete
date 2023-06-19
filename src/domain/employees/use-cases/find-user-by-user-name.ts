import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { Equipment } from '@/domain/inventory/entity/equipment';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { User } from '../entity/user';
import { UserNotFoundError } from './errors/user-not-found';

interface FindUserByUserNameRequest {
  userName: string;
}

interface FindUserByUserNameResponse {
  user: User;
  equipments: Equipment[];
}

export class FindUserByUserNameUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
  ) {}

  async execute({
    userName,
  }: FindUserByUserNameRequest): Promise<FindUserByUserNameResponse> {
    const user = await this.userRepository.findByUserName(userName);

    if (!user) {
      throw new UserNotFoundError();
    }

    const { equipments } = await this.userAssignmentsRepository.findByUserName(
      userName,
    );

    return {
      user,
      equipments,
    };
  }
}
