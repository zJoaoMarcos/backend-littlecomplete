import { IUserRepository } from '../../../domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class FindAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<FindAllUsersOutput> {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new UserNotFoundError();
    }

    return {
      users,
    };
  }
}

type FindAllUsersOutput = {
  users: {
    user_name: string;
    complete_name: string;
    title: string;
    department_id: string;
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: string;
    demission_date: string | null;
    status: string;
  }[];
};
