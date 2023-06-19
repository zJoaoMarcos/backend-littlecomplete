import { makeCreateUser } from '@/domain/employees/use-cases/factories/make-create-user';
import { InMemoryUserAssignmentsRepository } from '@/infra/repository/in-memory/in-memory-user-assigments-repository';
import { Equipment } from '../../entity/equipment';
import { makeCreateEquipment } from '../factories/make-create-equipment';
import { makeRegisterUserAssignment } from '../factories/make-register-user-assignment';
import { FindAssignmentsByUserNameUseCase } from './find-assignments-by-user-name';

let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let sut: FindAssignmentsByUserNameUseCase;

describe('Find Assignment By User Name Use Case', () => {
  beforeEach(() => {
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    sut = new FindAssignmentsByUserNameUseCase(userAssignmentsRepository);
  });

  it('should be able to find assignment by user name', async () => {
    userAssignmentsRepository.assignments.push(
      makeRegisterUserAssignment({
        equipment: makeCreateEquipment({ id: 'generic-equipment-id' }),
        user: makeCreateUser({ user_name: 'generic-user' }),
      }),
      makeRegisterUserAssignment(),
    );
    const { equipments } = await sut.execute({ userName: 'generic-user' });

    console.log(equipments);

    expect(equipments[0]).toBeInstanceOf(Equipment);
    expect(equipments[0].id).toEqual('generic-equipment-id');
  });
});
