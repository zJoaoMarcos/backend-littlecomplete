import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';
import { EquipmentAlreadyExistsError } from '../errors/equipment-already-exits-error';
import { CreateEquipmentUseCase } from './create-equipment';

let equipmentsRepository: InMemoryEquipmentRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: CreateEquipmentUseCase;

describe('Create Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new CreateEquipmentUseCase(
      equipmentsRepository,
      departmentsRepository,
    );
  });

  it('Should be able create Equipment', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const { equipment } = await sut.execute({
      id: '01-005-00434',
      brand: 'Dell',
      model: 'T31P',
      department: 'IOT',
      status: 'activate',
      ram: '16GB',
    });
    expect(equipment).toBeTruthy();
    expect(equipment.department).toEqual(expect.any(String));
  });

  it('Should not be able create Equipment with department nonexistent', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await expect(() =>
      sut.execute({
        id: '01-005-00434',
        brand: 'Dell',
        model: 'T31P',
        department: 'department-nonexistent',
        status: 'activate',
        ram: '16GB',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('Should not be able create Equipment with id twice', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    const id = '01-005-00434';

    await sut.execute({
      id,
      brand: 'Dell',
      model: 'XPTO',
      department: 'IOT',
      status: 'activate',
      ram: '16GB',
    });

    await expect(() =>
      sut.execute({
        id,
        brand: 'Dell',
        model: 'XPTO',
        department: 'IOT',
        status: 'activate',
        ram: '16GB',
      }),
    ).rejects.toBeInstanceOf(EquipmentAlreadyExistsError);
  });
});
