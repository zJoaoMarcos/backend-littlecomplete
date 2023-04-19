import { UserRepositoryInterface } from 'src/core/repository/user-repository';
import { User } from '../../../core/entity/user';

export class InMemoryUserRepository implements UserRepositoryInterface {
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

  findByUserName(userName: string): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }

  async updateUserDepartment(
    userName: string,
    department: string,
  ): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    user.changeDepartment(department);

    return Promise.resolve(user);
  }

  updateUserTitle(userName: string, title: string): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    user.changeTitle(title);

    return Promise.resolve(user);
  }

  assignTelephone(userName: string, telephone: number): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    user.assignTelephone(telephone);

    return Promise.resolve(user);
  }
}
