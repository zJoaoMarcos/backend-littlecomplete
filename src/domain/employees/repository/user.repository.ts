import { PaginationParams } from 'src/core/repositories/pagination-params';
import { User } from '../entity/user';

export interface IUserRepository {
  findMany(
    params: PaginationParams,
  ): Promise<{ users: User[]; totalCount: number }>;

  findByUserName(userName: string): Promise<User>;

  findByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<{ users: User[]; totalCount: number }>;

  findByEmail(email: string): Promise<User>;

  findByDirectBoss(directBoss: string): Promise<User[]>;

  create(user: User): Promise<void>;

  save(user: User): Promise<void>;
}
