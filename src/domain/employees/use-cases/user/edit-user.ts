/* eslint-disable @typescript-eslint/ban-types */
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { DepartmentNotFoundError } from '@/domain/errors/department-not-found';
import { UserNotFoundError } from '@/domain/errors/user-not-found';

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
  }: UpdateUserInput): Promise<UpdateUserStatusOutput> {
    const user = await this.userRepository.findByUserName(user_name);

    if (!user) {
      throw new UserNotFoundError();
    }

    const departmentExists = await this.departmentRepository.findById(
      department_id,
    );

    if (!departmentExists) {
      return new DepartmentNotFoundError();
    }

    user.complete_name = complete_name;
    user.department_id = department_id;
    user.title = title;
    user.telephone = telephone;
    user.admission_date = admission_date;
    user.demission_date = demission_date;
    user.direct_boss = direct_boss;
    user.smtp = smtp;

    await this.userRepository.save(user);

    return {};
  }
}

type UpdateUserInput = {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: number;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: Date | null;
  demission_date: Date | null;
};

type UpdateUserStatusOutput = {};
