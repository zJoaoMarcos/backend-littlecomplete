import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import {
  IUserAssignmentsRepository,
  ResponseUserAssignments,
} from '../../../domain/repository/user-assignments-repository';

export class InMemoryUserAssignmentsRepository
  implements IUserAssignmentsRepository
{
  assignments: UserAssignments[] = [];

  async save(user: User, equipment: Equipment): Promise<UserAssignments> {
    const userAssignments = UserAssignments.create({ user, equipment });

    this.assignments.push(userAssignments);

    return userAssignments;
  }

  async findAll(): Promise<UserAssignments[]> {
    const userAssignments = this.assignments;

    if (!userAssignments) {
      return null;
    }

    return userAssignments;
  }

  async findByEquipmentId(id: string): Promise<User> {
    const userAssignments = this.assignments.find(
      (item) => item.equipment.id === id,
    );

    if (!userAssignments) {
      return null;
    }

    return userAssignments.user;
  }

  findByUserName(id: string): Promise<ResponseUserAssignments> {
    throw new Error('Method not implemented.');
  }
}
