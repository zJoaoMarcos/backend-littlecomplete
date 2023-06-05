import { PaginationParams } from '@/core/repositories/pagination-params';
import { User } from '@/domain/employees/entity/user';
import {
  FindManyOutput,
  IUserRepository,
} from '@/domain/employees/repository/user.repository';

export class InMemoryUserRepository implements IUserRepository {
  users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findMany(): Promise<FindManyOutput> {
    const users = this.users;
    const totalCount = this.users.length;

    return {
      users,
      totalCount,
    };
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

  async findByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<FindManyOutput> {
    const users = await this.users.filter(
      (user) => user.department_id === departmentId,
    );
    const totalCount = users.length;

    return {
      users,
      totalCount,
    };
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.users.findIndex(
      (item) => item.user_name === user.user_name,
    );

    this.users[itemIndex] = user;
  }
}
