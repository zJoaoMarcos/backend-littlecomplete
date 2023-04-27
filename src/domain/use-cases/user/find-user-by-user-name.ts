import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class FindUserByUserNameUseCase {
  constructor(private userRepository: IUserRepository) {}

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
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department_id: string;
      telephone: number | null;
      direct_boss: string;
      smtp: string;
      admission_date: Date;
      demission_date: Date | null;
      status: string;
    };
  };
};
