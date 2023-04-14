import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateDepartmentUseCase } from '../department/create-department';
import { CreateEquipmentUseCase } from './create-equipment';

describe('Create Equipment Use Case', () => {
  it('Should be able create Equipment', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const equipmentRepository = new InMemoryEquipmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    await createDepartmentUseCase.execute({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
      departmentsRepository,
    );

    expect(() =>
      createEquipmentUseCase.execute({
        id: '01-005-00434',
        brand: 'Dell',
        model: 'T31P',
        department: 'TI',
        status: 'activate',
        ram: '16GB',
      }),
    ).resolves;
  });

  it('Should not be able create Equipment with id twice', async () => {
    const equipmentRepository = new InMemoryEquipmentRepository();
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
      departmentsRepository,
    );

    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    await createDepartmentUseCase.execute({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const id = '01-005-00434';

    await createEquipmentUseCase.execute({
      id,
      brand: 'Dell',
      model: 'XPTO',
      department: 'TI',
      status: 'activate',
      ram: '16GB',
    });

    expect(() =>
      createEquipmentUseCase.execute({
        id,
        brand: 'Dell',
        model: 'XPTO',
        department: 'TI',
        status: 'activate',
        ram: '16GB',
      }),
    ).rejects.toThrowError('Equipment already exits');
  });
});
