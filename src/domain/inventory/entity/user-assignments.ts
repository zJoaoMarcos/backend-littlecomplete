import { Entity } from '@/core/entities/entity';
import { User } from '@/domain/employees/entity/user';
import { Equipment } from './equipment';

export interface UserAssignmentsProps {
  user: User;
  equipment: Equipment;
}

export class UserAssignments extends Entity<UserAssignmentsProps> {
  static create(props: UserAssignmentsProps) {
    const userAssignments = new UserAssignments({
      ...props,
    });

    return userAssignments;
  }

  get user() {
    return this.props.user;
  }

  get equipment() {
    return this.props.equipment;
  }
}
