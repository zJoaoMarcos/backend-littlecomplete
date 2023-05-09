import { User } from '../../../domain/entity/user';
import { IDepartmentRepository } from '../../../domain/repository/department-repository';
import { IUserRepository } from '../../../domain/repository/user-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error';
import { UserNameAlreadyExistsError } from '../errors/user-name-already-exits-error';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private departmentRepository: IDepartmentRepository,
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
  }: CreateUserInput): Promise<CreateUserOutput> {
    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const userNameTwice = await this.userRepository.findByUserName(user_name);

    if (userNameTwice) {
      throw new UserNameAlreadyExistsError();
    }

    const emailTwice = await this.userRepository.findByEmail(smtp);

    if (emailTwice) {
      throw new EmailAlreadyExistsError();
    }

    const user = User.create({
      user_name,
      complete_name,
      title,
      department_id: departmentExists.name,
      telephone,
      direct_boss,
      smtp,
      admission_date: admission_date ? admission_date : new Date(),
      demission_date: null,
      status: 'active',
    });

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
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
};

type CreateUserOutput = {
  user: {
    props: {
      user_name: string;
      complete_name: string;
      title: string;
      department_id: string;
      telephone: number;
      direct_boss: string;
      smtp: string;
      admission_date: Date;
      demission_date: Date;
      status: string;
    };
  };
};
