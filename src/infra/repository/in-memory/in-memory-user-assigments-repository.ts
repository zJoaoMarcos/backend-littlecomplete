import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import {
  FindByUserNameOutput,
  IUserAssignmentsRepository,
} from '../../../domain/repository/user-assignments-repository';

export class InMemoryUserAssignmentsRepository
  implements IUserAssignmentsRepository
{
  assignments: UserAssignments[] = [];

  async save(userAssignments: UserAssignments): Promise<void> {
    this.assignments.push(userAssignments);
  }

  async findMany(): Promise<UserAssignments[]> {
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

  findByUserName(id: string): Promise<FindByUserNameOutput> {
    throw new Error('Method not implemented.');
  }
}
