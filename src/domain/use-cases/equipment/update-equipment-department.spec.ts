import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateDepartmentUseCase } from '../department/create-department';
import { CreateEquipmentUseCase } from './create-equipment';
import { updateEquipmentDepartmentUseCase } from './update-equipment-department';

describe('Update Equipment Use Case', () => {
  it('should not be able update Equipment department with a department that does exist ', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    await createDepartmentUseCase.execute({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await createDepartmentUseCase.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
      departmentsRepository,
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

    const updateEquipment = new updateEquipmentDepartmentUseCase(
      equipmentRepository,
      departmentsRepository,
    );

    expect(() => {
      updateEquipment.execute({ id: '01-005-00134', department: 'IO' });
    }).rejects;
  });

  it('should be able update Equipment department ', async () => {
    const departmentsRepository = new InMemoryDepartmentRepository();
    const createDepartmentUseCase = new CreateDepartmentUseCase(
      departmentsRepository,
    );

    await createDepartmentUseCase.execute({
      name: 'TI',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await createDepartmentUseCase.execute({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
      departmentsRepository,
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

    const updateEquipment = new updateEquipmentDepartmentUseCase(
      equipmentRepository,
      departmentsRepository,
    );

    expect(() => {
      updateEquipment.execute({ id: '01-005-00134', department: 'IOT' });
    }).resolves;
  });
});
