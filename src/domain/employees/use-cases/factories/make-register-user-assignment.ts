import {
    UserAssignments,
    UserAssignmentsProps,
} from '@/domain/inventory/entity/user-assignments';
import { makeCreateUser } from './make-create-user';

export function makeRegisterUserAssignment(
  override: Partial<UserAssignmentsProps> = {},
) {
  const assignment = UserAssignments.create({
    equipment: ,
    user: makeCreateUser(),
  });
}
