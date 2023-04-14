import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateDepartmentUseCase } from '../department/create-department';
import { CreateEquipmentUseCase } from './create-equipment';
import { FindAllEquipmentsUseCase } from './find-all-equipments';

describe('Find All Equipments Use Case', () => {
  it('should be able list all Equipments', async () => {
    const departmentRepository = new InMemoryDepartmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentRepository,
    );
    await createDepartmentUseCase.execute({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
      departmentRepository,
    );
    await createEquipmentUseCase.execute({
      id: '01-005-00132',
      brand: 'Dell',
      model: 'XPTO',
      department: 'TI',
      status: 'activate',
      ram: '16GB',
    });

    await createEquipmentUseCase.execute({
      id: '01-005-00134',
      brand: 'Dell',
      model: 'XPTO',
      department: 'TI',
      status: 'activate',
      ram: '16GB',
    });

    const findAllEquipments = new FindAllEquipmentsUseCase(equipmentRepository);
    expect(() => {
      findAllEquipments.execute();
    }).resolves;
  });
});
