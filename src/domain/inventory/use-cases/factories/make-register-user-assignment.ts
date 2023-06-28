import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import {
  UserAssignments,
  UserAssignmentsProps,
} from '@/domain/inventory/entity/user-assignments';
import { makeCreateEquipment } from './make-create-equipment';

export function makeRegisterUserAssignment(
  override: Partial<UserAssignmentsProps> = {},
) {
  const assignment = UserAssignments.create({
    equipment: makeCreateEquipment(),
    user: makeCreateUser(),
    ...override,
  });

  return assignment;
}
