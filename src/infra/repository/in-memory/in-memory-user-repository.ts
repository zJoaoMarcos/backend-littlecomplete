import { IUserRepository } from 'src/domain/repository/user-repository';
import { User } from '../../../domain/entity/user';

export class InMemoryUserRepository implements IUserRepository {
  users: User[] = [];
  updateUserStatus(userName: string, status: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(
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
  ): Promise<User> {
    const user = User.create({
      user_name,
      complete_name,
      title,
      department_id,
      telephone,
      direct_boss,
      smtp,
      admission_date,
      status,
      demission_date,
    });

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

    user.department_id = department;

    return Promise.resolve(user);
  }

  updateUserTitle(userName: string, title: string): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    user.title = title;

    return Promise.resolve(user);
  }

  assignTelephone(userName: string, telephone: number): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    user.telephone = telephone;

    return Promise.resolve(user);
  }
}
