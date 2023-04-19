import { User } from '../entity/user';

export interface UserRepositoryInterface {
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
}
