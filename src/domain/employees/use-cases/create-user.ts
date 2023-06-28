import { User } from '@/domain/employees/entity/user';
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { DepartmentNotFoundError } from './errors/department-not-found-error';
import { DirectBossNotFoundError } from './errors/direct-boss-not-found-error';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';
import { UserNameAlreadyExistsError } from './errors/user-name-already-exits-error';

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
  }: CreateUserInput): Promise<CreateUserOutput> {
    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      throw new DepartmentNotFoundError();
    }

    const departmentName = departmentExists.name;

    const userAlreadyExists = await this.userRepository.findByUserName(
      user_name,
    );

    if (userAlreadyExists) {
      throw new UserNameAlreadyExistsError();
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(smtp);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError();
    }

    const directBossExists = await this.userRepository.findByUserName(
      direct_boss,
    );

    if (!directBossExists) {
      throw new DirectBossNotFoundError();
    }

    const user = User.create({
      user_name,
      complete_name,
      title,
      department: {
        id: department_id,
        name: departmentName,
      },
      telephone,
      direct_boss,
      smtp,
      admission_date: new Date(),
      demission_date: null,
      status: 'active',
    });

    await this.userRepository.create(user);

    return { user };
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
};

type CreateUserOutput = {
  user: User;
};
