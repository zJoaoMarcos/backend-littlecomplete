import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    user_id: string,
    status: string,
  ): Promise<UpdateUserStatusOutput> {
    const user = await this.userRepository.findByUserName(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.updateUserStatus(
      user_id,
      status,
    );

    return {
      updatedUser,
    };
  }
}

type UpdateUserStatusOutput = {
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
