/* eslint-disable @typescript-eslint/ban-types */
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class EditUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute({
    user_name,
    complete_name,
    department_id,
    status,
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

    const department = await this.departmentRepository.findById(department_id);

    user.complete_name = complete_name;
    user.department_id = department.name;
    user.title = title;
    user.status = status;
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
  status: string;
};

type UpdateUserStatusOutput = {};
