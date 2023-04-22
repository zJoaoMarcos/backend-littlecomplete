import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentPerUserRepository } from '../../../infra/repository/in-memory/in-memory-equipment-per-user-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { InMemoryUserRepository } from '../../../infra/repository/in-memory/in-memory-user-repository';
import { CreateEquipmentUseCase } from '../equipment/create-equipment';
import { CreateUserUseCase } from '../user/create-user';
import { FindAllEquipmentsPerUserUseCase } from './find-all-equipments-per-user';
import { SaveEquipmentPerUserUseCase } from './save-equipment-per-user';

let equipmentsPerUserRepository: InMemoryEquipmentPerUserRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let equipmentsRepository: InMemoryEquipmentRepository;
let userRepository: InMemoryUserRepository;
let createUser: CreateUserUseCase;
let createEquipment: CreateEquipmentUseCase;
let saveEquipmentPerUser: SaveEquipmentPerUserUseCase;
let sut: FindAllEquipmentsPerUserUseCase;

describe('Find All Equipments Per Use', () => {
  beforeEach(() => {
    equipmentsPerUserRepository = new InMemoryEquipmentPerUserRepository();
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUserUseCase(userRepository, departmentsRepository);
    createEquipment = new CreateEquipmentUseCase(
      equipmentsRepository,
      departmentsRepository,
    );
    saveEquipmentPerUser = new SaveEquipmentPerUserUseCase(
      equipmentsPerUserRepository,
      userRepository,
      equipmentsRepository,
    );
    sut = new FindAllEquipmentsPerUserUseCase(equipmentsPerUserRepository);
  });

  it('Should be able to Save Equipment Per Use', async () => {
    await departmentsRepository.departments.push({
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

    await saveEquipmentPerUser.execute(user.user_name, equipment.id);
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const { user: user1 } = await createUser.execute({
      user_name: 'jane_doe',
      complete_name: 'Jane Doe',
      title: 'Developer',
      telephone: 5432,
      department_id: 'IOT',
      smtp: 'jane_doe@email.com',
      direct_boss: 'Uncle Bob',
      admission_date: '08/03/2019',
      demission_date: null,
      status: 'vacation',
    });

    const { equipment: equipment1 } = await createEquipment.execute({
      id: '01-005-00424',
      brand: 'Dell',
      model: 'T31P',
      department: 'IOT',
      status: 'activate',
      ram: '16GB',
      slots: 2,
      storage0_syze: 240,
      storage0_type: 'SSD',
    });

    await saveEquipmentPerUser.execute(user.user_name, equipment.id);
    await saveEquipmentPerUser.execute(user1.user_name, equipment1.id);

    const { equipmentsPerUser } = await sut.execute();

    await expect(equipmentsPerUser[1].user.user_name).toEqual('jhon_doe');
    await expect(equipmentsPerUser[1].equipment.id).toEqual('01-005-00434');
    await expect(equipmentsPerUser[2].user.user_name).toEqual('jane_doe');
    await expect(equipmentsPerUser[2].equipment.id).toEqual('01-005-00424');
  });
});
