import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class AssignTelephoneForUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userId: string,
    telephoneId: number,
  ): Promise<AssignTelephoneForUserOutput> {
    const user = await this.userRepository.findByUserName(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.assignTelephone(
      userId,
      telephoneId,
    );

    return {
      updatedUser,
    };
  }
}

type AssignTelephoneForUserOutput = {
  updatedUser: {
    props: {
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
};
