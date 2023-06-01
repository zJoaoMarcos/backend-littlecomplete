import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { FindAllEquipmentsUseCase } from './find-all-equipments';

let equipmentsRepository: InMemoryEquipmentRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: FindAllEquipmentsUseCase;

describe('Find All Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new FindAllEquipmentsUseCase(equipmentsRepository);
  });

  it('should be able list all Equipments', async () => {
    await departmentsRepository.departments.push({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    await equipmentsRepository.equipments.push({
      id: '01-005-00132',
      brand: 'Dell',
      model: 'XPTO',
      department: 'TI',
      status: 'activate',
      ram: '16GB',
      supplier: '',
      invoice: '',
      warranty: '',
      purchase_date: '',
      cpu: '',
      slots: 0,
      storage0_type: '',
      storage0_syze: 0,
      storage1_type: '',
      storage1_syze: 0,
      video: '',
      service_tag: '',
    });

    await equipmentsRepository.equipments.push({
      id: '01-005-00134',
      brand: 'Dell',
      model: 'XPTO',
      department: 'TI',
      status: 'activate',
      ram: '16GB',
      supplier: '',
      invoice: '',
      warranty: '',
      purchase_date: '',
      cpu: '',
      slots: 0,
      storage0_type: '',
      storage0_syze: 0,
      storage1_type: '',
      storage1_syze: 0,
      video: '',
      service_tag: '',
    });

    await expect(() => {
      sut.execute();
    }).resolves;
  });
});
