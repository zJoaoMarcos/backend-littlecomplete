import { UserRepositoryInterface } from 'src/core/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class FindUserByUserNameUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userName: string): Promise<FindUserByUserNameOutput> {
    const user = await this.userRepository.findByUserName(userName);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}

type FindUserByUserNameOutput = {
  user: {
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
  };
};
