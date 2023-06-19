import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { Equipment } from '../../entity/equipment';
import { makeCreateEquipment } from '../factories/make-create-equipment';
import { FindEquipmentByIdUseCase } from './find-equipment-by-id';

let equipmentsRepository: InMemoryEquipmentRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: FindEquipmentByIdUseCase;

describe('Find All Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new FindEquipmentByIdUseCase(equipmentsRepository);
  });

  it('should be able list all Equipments', async () => {
    equipmentsRepository.equipments.push(
      makeCreateEquipment(),
      makeCreateEquipment({ id: 'generic.name', type: 'notebook' }),
      makeCreateEquipment(),
    );

    const { equipment } = await sut.execute({ id: 'generic.name' });

    expect(equipment).toBeInstanceOf(Equipment);
    expect(equipment.type).toEqual('notebook');
  });
});
