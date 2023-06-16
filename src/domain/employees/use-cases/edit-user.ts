import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/errors/user-not-found';
import { User } from '../entity/user';
import { DepartmentNotFoundError } from './errors/department-not-found-error';
import { DirectBossNotFoundError } from './errors/direct-boss-not-found-error';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';

interface UpdateUserResponse {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
}

interface UpdateUserStatusResponse {
  user: User;
}

export class EditUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    user_name,
    complete_name,
    department_id,
    telephone,
    admission_date,
    demission_date,
    direct_boss,
    smtp,
    title,
  }: UpdateUserResponse): Promise<UpdateUserStatusResponse> {
    const user = await this.userRepository.findByUserName(user_name);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (department_id !== user.department_id) {
      const departmentExists = await this.departmentRepository.findById(
        department_id,
      );

      if (!departmentExists) {
        throw new DepartmentNotFoundError();
      }

      user.department_id = department_id;
    }

    if (direct_boss !== user.direct_boss) {
      const directBossExists = await this.userRepository.findByUserName(
        direct_boss,
      );

      if (!directBossExists) {
        throw new DirectBossNotFoundError();
      }

      user.direct_boss = direct_boss;
    }

    if (smtp !== user.smtp) {
      const emailAlreadyExists = await this.userRepository.findByEmail(smtp);

      if (emailAlreadyExists) {
        throw new EmailAlreadyExistsError();
      }

      user.smtp = smtp;
    }

    user.complete_name = complete_name;
    user.title = title;
    user.telephone = telephone;
    user.admission_date = admission_date;
    user.demission_date = demission_date;

    await this.userRepository.save(user);

    return {
      user,
    };
  }
}
