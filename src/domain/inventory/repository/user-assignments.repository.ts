import { User } from '@/domain/employees/entity/user';
import { Equipment } from '../entity/equipment';
import { UserAssignments } from '../entity/user-assignments';

export interface IUserAssignmentsRepository {
  findMany(): Promise<UserAssignments[]>;
  findByEquipmentId(id: string): Promise<User>;
  findByUserName(userName: string): Promise<FindByUserNameOutput>;
  save(userAssignments: UserAssignments): Promise<void>;
  deleteByEquipmentId(id: string): Promise<void>;
  deleteManyByUserName(userName: string): Promise<void>;
}

export type FindByUserNameOutput = {
  equipments: Equipment[];
};
