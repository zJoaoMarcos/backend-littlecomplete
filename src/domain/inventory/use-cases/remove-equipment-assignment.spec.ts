import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { makeCreateEquipment } from './factories/make-create-equipment';
import { makeRegisterUserAssignment } from './factories/make-register-user-assignment';
import { RemoveEquipmentAssignmentUseCase } from './remove-equipment-assignment';

let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let usersRepository: InMemoryUserRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let sut: RemoveEquipmentAssignmentUseCase;

describe('Remove Equipment Assignment Use Case', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUserRepository();
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    sut = new RemoveEquipmentAssignmentUseCase(
      userAssignmentsRepository,
      equipmentsRepository,
    );
  });

  it('should be able remove equipment assignment', async () => {
    const user = makeCreateUser({ user_name: 'jhon.doe' });
    usersRepository.users.push(user);

    const equipment = makeCreateEquipment({
      id: 'generic-equipment1',
      type: 'notebook',
    });
    const equipment1 = makeCreateEquipment({
      id: 'generic-equipment2',
      type: 'desktop',
    });
    equipmentsRepository.equipments.push(equipment, equipment1);

    userAssignmentsRepository.assignments.push(
      makeRegisterUserAssignment({ user, equipment }),
      makeRegisterUserAssignment({ user, equipment: equipment1 }),
    );

    const { equipment: equipmentRemoved } = await sut.execute({
      equipmentId: 'generic-equipment2',
    });

    expect(equipmentRemoved.type).toEqual('desktop');
  });
});
