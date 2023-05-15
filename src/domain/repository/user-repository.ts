import { PaginationParams } from 'src/core/repositories/pagination-params';
import { User } from '../entity/user';

export interface IUserRepository {
  findMany(params: PaginationParams): Promise<FindManyOutput>;
  findByUserName(userName: string): Promise<User>;
  findByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<FindManyOutput>;
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<void>;
  save(user: User): Promise<void>;
}

export type FindManyOutput = {
  users: User[];
  totalCount: number;
};
