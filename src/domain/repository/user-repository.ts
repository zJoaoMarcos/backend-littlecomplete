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

  findAll(
    skip?: number,
    take?: number,
    where?: string,
  ): Promise<FindAllResponse>;

  findByUserName(userName: string): Promise<User>;
  findByEmail(email: string): Promise<User>;

  save(user: User): Promise<void>;
}

export type FindAllResponse = {
  users: User[];
  totalCount: number;
};
