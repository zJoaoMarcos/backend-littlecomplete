import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserAssignmentsRepository } from '../../../infra/repository/in-memory/in-memory-user-assigments-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { CreateDepartmentUseCase } from '../department/create-department';
import { CreateEquipmentUseCase } from '../equipment/create-equipment';
import { CreateUserUseCase } from '../user/create-user';
import { SaveUserAssignmentsUseCase } from './save-user-assignments';

let equipmentsPerUserRepository: InMemoryUserAssignmentsRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let userRepository: InMemoryUserRepository;
let createUser: CreateUserUseCase;
let createDepartment: CreateDepartmentUseCase;
let createEquipment: CreateEquipmentUseCase;
let sut: SaveUserAssignmentsUseCase;

describe('Save User Assignment Use Case', () => {
  beforeEach(() => {
    equipmentsPerUserRepository = new InMemoryUserAssignmentsRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    userRepository = new InMemoryUserRepository();
    createDepartment = new CreateDepartmentUseCase(departmentsRepository);
    createUser = new CreateUserUseCase(userRepository, departmentsRepository);
    createEquipment = new CreateEquipmentUseCase(
      equipmentsRepository,
      departmentsRepository,
    );
    sut = new SaveUserAssignmentsUseCase(
      equipmentsPerUserRepository,
      userRepository,
      equipmentsRepository,
    );
  });

  it('Should be able to Save Equipment Per Use', async () => {
    await createDepartment.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const { user } = await createUser.execute({
      user_name: 'jhon_doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      telephone: 5432,
      department_id: 'IOT',
      smtp: 'jhon_doe@email.com',
      direct_boss: 'Uncle Bob',
      admission_date: '08/03/2019',
      demission_date: null,
      status: 'active',
    });

    const { equipment } = await createEquipment.execute({
      id: '01-005-00434',
      brand: 'Dell',
      model: 'T31P',
      department: 'IOT',
      status: 'activate',
      ram: '16GB',
      slots: 2,
      storage0_syze: 240,
      storage0_type: 'SSD',
    });

    const { userAssignments } = await sut.execute(user.user_name, equipment.id);

    await expect(userAssignments.user.user_name).toEqual('jhon_doe');
  });
});
