import { User } from '../entity/user';

export interface IUserRepository {
  create(
    user_name: string,
    complete_name: string,
    title: string,
    department_id: string,
    direct_boss: string,
    smtp: string,
    admission_date: string,
    status: string,
    telephone?: number,
    demission_date?: string,
  ): Promise<User>;

  findAll(): Promise<User[]>;

  findByUserName(userName: string): Promise<User>;

  updateUserDepartment(userName: string, department: string): Promise<User>;

  updateUserTitle(userName: string, title: string): Promise<User>;

  assignTelephone(userName: string, telephone: number): Promise<User>;
}
