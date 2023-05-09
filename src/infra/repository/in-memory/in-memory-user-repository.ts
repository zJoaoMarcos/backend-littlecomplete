import {
  FindAllResponse,
  IUserRepository,
} from 'src/domain/repository/user-repository';
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

  async findAll(): Promise<FindAllResponse> {
    const users = this.users;
    const totalCount = this.users.length;

    return Promise.resolve({ users, totalCount });
  }

  async findByUserName(userName: string): Promise<User> {
    const user = this.users.find((user) => user.user_name === userName);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.smtp === email);

    if (!user) {
      return null;
    }

    return Promise.resolve(user);
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.users.findIndex(
      (item) => item.user_name === user.user_name,
    );

    this.users[itemIndex] = user;
  }
}
