import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateDepartmentUseCase } from '../department/create-department';
import { CreateEquipmentUseCase } from './create-equipment';
import { updateEquipmentDepartmentUseCase } from './update-equipment';

describe('Update Equipment Use Case', () => {
  it('should be able update Equipment department', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createDepartment = new CreateDepartmentUseCase(departmentsRepository);

    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
    );

    const updateEquipment = new updateEquipmentDepartmentUseCase(
      equipmentRepository,
      departmentsRepository,
    );

    await createDepartment.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    await createDepartment.execute({
      name: 'SI',
      cost_center: 2420,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

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

    expect(() => {
      updateEquipment.execute({ id: '01-005-00134', department: 'TI' });
    }).resolves;
  });
});
