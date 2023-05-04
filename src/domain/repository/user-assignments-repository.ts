import { Equipment } from '../entity/equipment';
import { User } from '../entity/user';
import { UserAssignments } from '../entity/user-assignments';

export interface IUserAssignmentsRepository {
  save(user: User, equipment: Equipment): Promise<UserAssignments>;
  findAll(): Promise<UserAssignments[]>;
  findByEquipmentId(id: string): Promise<User>;

  findByUserName(userId: string): Promise<ResponseUserAssignments>;
}

export type ResponseUserAssignments = {
  equipments: Equipment[];
};
