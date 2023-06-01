import { Equipment } from '../../../domain/entity/equipment';
import { User } from '../../../domain/entity/user';
import { UserAssignments } from '../../../domain/entity/user-assignments';
import { InMemoryUserAssignmentsRepository } from '../../../infra/repository/in-memory/in-memory-user-assigments-repository';
import { FindAssignmentsByUserNameUseCase } from './find-assignments-by-user-name';

describe('Find Assignment By User Name Use Case', () => {
  let userAssignmentsRepository: InMemoryUserAssignmentsRepository;
  let sut: FindAssignmentsByUserNameUseCase;

  beforeEach(() => {
    userAssignmentsRepository = new InMemoryUserAssignmentsRepository();
    sut = new FindAssignmentsByUserNameUseCase(userAssignmentsRepository);
  });

  it('should be able to find assignment by user name', async () => {
    const user = User.create({
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
    });
    const equipment = Equipment.create({
      id: 'equipment-id-1',
      brand: 'brand',
      model: 'model',
      cpu: 'cpu',
      ram: 'ram',
      department: 'department',
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
    });
    const assigments = UserAssignments.create({ equipment, user });
    userAssignmentsRepository.assignments.push(assigments);

    const { userAssignments } = await sut.execute('jhon_doe');

    expect(userAssignments[0].equipment.id).toEqual('equipment-id-1');
    expect(userAssignments[0].user.user_name).toEqual('jhon_doe');
  });
});
