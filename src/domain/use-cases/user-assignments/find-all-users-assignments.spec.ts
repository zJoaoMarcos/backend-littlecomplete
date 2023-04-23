import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import { InMemoryUserAssignmentsRepository } from '../../../infra/repository/in-memory/in-memory-user-assigments-repository';
import { FindAllUsersAssignmentsUseCase } from './find-all-users-assignments';

let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
let sut: FindAllUsersAssignmentsUseCase;

describe('Find All Equipments Per Use', () => {
  beforeEach(() => {
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();

    sut = new FindAllUsersAssignmentsUseCase(userAssignmentsRepository);
  });

  it('Should be able list User Assignments ', async () => {
    const userAssignment1 = UserAssignments.create({
      user: User.create({
        user_name: 'jhon_doe',
        complete_name: 'Jhon Doe',
        telephone: 5432,
        title: 'Developer',
        department_id: 'TI',
        direct_boss: 'Uncle Bob',
        smtp: 'jhon_doe@email.com',
        status: 'active',
        admission_date: '20/04/2001',
        demission_date: null,
      }),
      equipment: Equipment.create({
        id: 'equipment-id-1',
        brand: 'Dell',
        model: 'XPTO',
        cpu: null,
        ram: null,
        department: 'TI',
        status: 'active',
        invoice: null,
        purchase_date: null,
        service_tag: null,
        slots: 1,
        storage0_syze: 240,
        storage0_type: 'SSD',
        storage1_syze: null,
        storage1_type: null,
        supplier: null,
        video: null,
        warranty: null,
      }),
    });
    userAssignmentsRepository.assignments.push(userAssignment1);

    const { userAssignments } = await sut.execute();

    await expect(userAssignments[0].user.user_name).toEqual('jhon_doe');
    await expect(userAssignments[0].equipment.id).toEqual('equipment-id-1');
  });
});
