import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserDepartementUseCase {
  constructor(
    private userRepository: IUserRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    user_name: string,
    departement: string,
  ): Promise<UpdateUserDepartementOutput> {
    const user = await this.userRepository.findByUserName(user_name);

    if (!user) {
      throw new UserNotFoundError();
    }

    const departementExists = await this.departmentRepository.findByName(
      departement,
    );

    if (!departementExists) {
      throw new DepartmentNotFoundError();
    }

    const updatedUser = await this.userRepository.updateUserDepartment(
      user.user_name,
      departement,
    );

    return {
      updatedUser,
    };
  }
}

type UpdateUserDepartementOutput = {
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
