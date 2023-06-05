import { User } from '@/domain/employees/entity/user';
import { UserAssignments } from '@/domain/inventory/entity/user-assignments';
import {
  FindByUserNameOutput,
  IUserAssignmentsRepository,
} from '@/domain/inventory/repository/user-assignments.repository';

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

  async findByUserName(userName: string): Promise<FindByUserNameOutput> {
    const assignments = await this.assignments.filter(
      (item) => item.user.user_name === userName,
    );

    if (!assignments) {
      return null;
    }

    const equipments = assignments.map((item) => {
      return item.equipment;
    });

    return {
      equipments: equipments,
    };
  }

  async deleteByEquipmentId(id: string): Promise<void> {
    const itemIndex = this.assignments.findIndex(
      (item) => item.equipment.id === id,
    );

    this.assignments.splice(itemIndex, 1);
  }

  async deleteManyByUserName(userName: string): Promise<void> {
    for (let i = this.assignments.length - 1; i >= 0; i--) {
      if (this.assignments[i].user.user_name === userName) {
        this.assignments.splice(i, 1);
      }
    }
  }
}
