import { User } from '../entity/user';

export interface IUserRepository {
  create(
    user_name: string,
    complete_name: string,
    title: string,
    department_id: string,
    direct_boss: string,
    smtp: string,
    admission_date: Date,
    status: string,
    telephone?: number,
    demission_date?: Date,
  ): Promise<User>;

  findAll(): Promise<User[]>;

  findByUserName(userName: string): Promise<User>;

  updateUserDepartment(
    userName: string,
    department: string,
    title: string,
    direct_boss: string,
  ): Promise<User>;

  updateUserTitle(userName: string, title: string): Promise<User>;

  updateUserStatus(userName: string, status: string): Promise<User>;

  assignTelephone(userName: string, telephone: number): Promise<User>;
}
