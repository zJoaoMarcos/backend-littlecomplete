import { User } from 'src/core/entity/user';
import { UserRepositoryInterface } from 'src/core/repository/user-repository';

export class InMemoryUserRepoitory implements UserRepositoryInterface {
  users: User[] = [];

  async create(
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
  ): Promise<User> {
    const user = new User(
      user_name,
      complete_name,
      title,
      department_id,
      direct_boss,
      smtp,
      admission_date,
      status,
      telephone,
      demission_date,
    );

    this.users.push(user);

    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}
