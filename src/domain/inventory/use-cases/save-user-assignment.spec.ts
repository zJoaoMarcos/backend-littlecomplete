import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '@/infra/repository/in-memory/in-memory-user-repository';
import { AssignmentNotAllowedError } from './errors/assignment-not-allowed-error';
import { EquipmentIsUnavailableError } from './errors/equipment-is-unavailable-error';
import { makeCreateEquipment } from './factories/make-create-equipment';
import { SaveUserAssignmentsUseCase } from './save-user-assignments';

let equipmentsPerUserRepository: InMemoryUserAssignmentsRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let usersRepository: InMemoryUserRepository;
let sut: SaveUserAssignmentsUseCase;

describe('Save User Assignment Use Case', () => {
  beforeEach(() => {
    equipmentsPerUserRepository = new InMemoryUserAssignmentsRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    usersRepository = new InMemoryUserRepository();
    sut = new SaveUserAssignmentsUseCase(
      equipmentsPerUserRepository,
      usersRepository,
      equipmentsRepository,
    );
  });

  it('should be able to Save Equipment Per Use', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));
    equipmentsRepository.equipments.push(
      makeCreateEquipment({ id: 'generic-equipment', status: 'available' }),
    );

    const { userAssignments } = await sut.execute({
      user_id: 'jhon.doe',
      equipment_id: 'generic-equipment',
    });

    await expect(userAssignments.user.user_name).toEqual('jhon.doe');
  });

  it('should not able assign equipment with status different from available', async () => {
    usersRepository.users.push(makeCreateUser({ user_name: 'jhon.doe' }));
    equipmentsRepository.equipments.push(
      makeCreateEquipment({ id: 'generic-equipment', status: 'pendency' }),
    );

    await expect(() =>
      sut.execute({
        user_id: 'jhon.doe',
        equipment_id: 'generic-equipment',
      }),
    ).rejects.toBeInstanceOf(EquipmentIsUnavailableError);
  });

  it('should not be able assign equiopment to user with status equal pendency or disabled', async () => {
    usersRepository.users.push(
      makeCreateUser({ user_name: 'jhon.doe', status: 'disabled' }),
    );
    equipmentsRepository.equipments.push(
      makeCreateEquipment({ id: 'generic-equipment', status: 'available' }),
    );

    await expect(() =>
      sut.execute({
        user_id: 'jhon.doe',
        equipment_id: 'generic-equipment',
      }),
    ).rejects.toBeInstanceOf(AssignmentNotAllowedError);
  });
});
