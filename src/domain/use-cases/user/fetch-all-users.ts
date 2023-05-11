import { IUserRepository } from '../../../domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class FetchAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    skip,
    take,
  }: FetchAllUsersInput): Promise<FetchAllUsersOutput> {
    const { users, totalCount } = await this.userRepository.findMany({
      skip,
      take,
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
  skip: number;
  take: number;
  where: string;
};

type FetchAllUsersOutput = {
  users: {
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department_id: number;
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
