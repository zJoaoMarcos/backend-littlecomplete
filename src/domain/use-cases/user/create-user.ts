import { User } from '../../../core/entity/user';
import { DepartmentRepositoryInterface } from '../../../core/repository/department-repository';
import { UserRepositoryInterface } from '../../../core/repository/user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { UserNameAlreadyExistsError } from '../errors/user-name-already-exits-error';

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private departmentRepository: DepartmentRepositoryInterface,
  ) {}

  async execute({
    user_name,
    complete_name,
    title,
    department_id,
    telephone,
    direct_boss,
    smtp,
    admission_date,
    demission_date,
    status,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const departmentExists = await this.departmentRepository.findByName(
      department_id,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const userNameTwice = await this.userRepository.findByUserName(user_name);

    if (userNameTwice) {
      throw new UserNameAlreadyExistsError();
    }

    const user = new User(
      user_name,
      complete_name,
      title,
      department_id,
      telephone,
      direct_boss,
      smtp,
      admission_date,
      demission_date,
      status,
    );

    await this.userRepository.create(
      user.user_name,
      user.complete_name,
      user.title,
      user.department_id,
      user.direct_boss,
      user.smtp,
      user.admission_date,
      user.status,
      user.telephone,
      user.demission_date,
    );

    return {
      user,
    };
  }
}

type CreateUserInput = {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number;
  direct_boss: string;
  smtp: string;
  admission_date: string;
  demission_date: string;
  status: string;
};

type CreateUserOutput = {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department_id: string;
    telephone: number;
    direct_boss: string;
    smtp: string;
    admission_date: string;
    demission_date: string;
    status: string;
  };
};
