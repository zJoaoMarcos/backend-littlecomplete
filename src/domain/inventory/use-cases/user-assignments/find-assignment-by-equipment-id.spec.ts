import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { makeCreateEquipment } from '../factories/make-create-equipment';
import { makeRegisterUserAssignment } from '../factories/make-register-user-assignment';
import { FindAssignmentByEquipmentIdUseCase } from './find-assignment-by-equipment-id';

let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let sut: FindAssignmentByEquipmentIdUseCase;

describe('Find Assignment By Equipment Id Use Case', () => {
  beforeEach(() => {
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    sut = new FindAssignmentByEquipmentIdUseCase(userAssignmentsRepository);
  });

  it('should be able to find assignment by equipment id', async () => {
    userAssignmentsRepository.assignments.push(
      makeRegisterUserAssignment({
        equipment: makeCreateEquipment({ id: 'generic-equipment-id' }),
        user: makeCreateUser({ user_name: 'generic-user' }),
      }),
      makeRegisterUserAssignment(),
    );

    const { user } = await sut.execute({ id: 'generic-equipment-id' });

    expect(user.user_name).toEqual('generic-user');
  });
});
