import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserTitleUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    user_id: string,
    title: string,
  ): Promise<UpdateUserTitleOutput> {
    const user = await this.userRepository.findByUserName(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.updateUserTitle(
      user_id,
      title,
    );

    return {
      updatedUser,
    };
  }
}

type UpdateUserTitleOutput = {
  updatedUser: {
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
