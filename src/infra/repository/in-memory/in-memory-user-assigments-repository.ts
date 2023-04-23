import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import { IUserAssignmentsRepository } from '../../../domain/repository/user-assignments-repository';

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

  async findByEquipmentId(id: string): Promise<UserAssignments> {
    const userAssignments = this.assignments.find(
      (item) => item.equipment.id === id,
    );

    if (!userAssignments) {
      return null;
    }

    return userAssignments;
  }

  async findByUserName(id: string): Promise<UserAssignments[]> {
    const userAssignments = this.assignments.filter(
      (item) => item.user.user_name === id,
    );

    if (!userAssignments) {
      return null;
    }

    return userAssignments;
  }
}
