import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { UserRepositoryInterface } from 'src/core/repository/user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserDepartementUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private departmentRepository: DepartmentRepositoryInterface,
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

    await this.userRepository.updateUserDepartment(user.user_name, departement);

    return {
      user,
    };
  }
}

type UpdateUserDepartementOutput = {
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
