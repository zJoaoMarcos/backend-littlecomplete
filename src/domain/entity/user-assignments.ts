import { Entity } from '../../core/entities/entity';
import { Equipment } from './equipment';
import { User } from './user';

interface UserAssignmentsProps {
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
