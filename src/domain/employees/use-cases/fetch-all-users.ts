import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/errors/user-not-found';
import { PaginationParams } from 'src/core/repositories/pagination-params';

export class FetchAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ params }: FetchAllUsersInput): Promise<FetchAllUsersOutput> {
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

type FetchAllUsersInput = {
  params: PaginationParams;
};

type FetchAllUsersOutput = {
  users: {
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department: { id: number; name: string };
      telephone: number | null;
      direct_boss: string;
      smtp: string;
      admission_date: Date;
      demission_date: Date | null;
      status: string;
    };
  }[];
  totalCount: number;
};
