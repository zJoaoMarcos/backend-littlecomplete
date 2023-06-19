import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { PaginationParams } from 'src/core/repositories/pagination-params';
import { User } from '../entity/user';
import { UserNotFoundError } from './errors/user-not-found';

interface FetchAllUsersRequest {
  params: PaginationParams;
}

interface FetchAllUsersResponse {
  users: User[];
  totalCount: number;
}

export class FetchAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    params,
  }: FetchAllUsersRequest): Promise<FetchAllUsersResponse> {
    const { users, totalCount } = await this.userRepository.findMany({
      ...params,
    });

    if (!users) {
      throw new UserNotFoundError();
    }

    return {
      users,
      totalCount,
    };
  }
}
