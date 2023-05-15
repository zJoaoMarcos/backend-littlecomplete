import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';
import { UserAssignments } from '../entity/user-assignments';

export interface IUserAssignmentsRepository {
  findMany(): Promise<UserAssignments[]>;
  findByEquipmentId(id: string): Promise<User>;
  findByUserName(userName: string): Promise<FindByUserNameOutput>;
  save(userAssignments: UserAssignments): Promise<void>;
}

export type FindByUserNameOutput = {
  equipments: Equipment[];
};
