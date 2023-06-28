import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { makeCreateEquipment } from './factories/make-create-equipment';
import { makeRegisterUserAssignment } from './factories/make-register-user-assignment';
import { RemoveAllUserAssignmentsUseCase } from './remove-all-user-assignments';

let usersRepository: InMemoryUserRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let usersAssignmentRepository: InMemoryUserAssignmentsRepository;
let sut: RemoveAllUserAssignmentsUseCase;

describe('Remove All User Assignments', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUserRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    usersAssignmentRepository = new InMemoryUserAssignmentsRepository();
    sut = new RemoveAllUserAssignmentsUseCase(
      usersAssignmentRepository,
      usersRepository,
      equipmentsRepository,
    );
  });

  it('should be able to remove all assignments of user', async () => {
    const user = makeCreateUser({ user_name: 'jhon.doe' });
    usersRepository.users.push(user);

    const equipment = makeCreateEquipment({ id: 'generic-equipment1' });
    const equipment1 = makeCreateEquipment({ id: 'generic-equipment2' });
    equipmentsRepository.equipments.push(equipment, equipment1);

    usersAssignmentRepository.assignments.push(
      makeRegisterUserAssignment({ user, equipment }),
      makeRegisterUserAssignment({ user, equipment: equipment1 }),
    );

    const { userEquipments } = await sut.execute({ username: 'jhon.doe' });
    expect(userEquipments.length).toEqual(0);
  });
});
