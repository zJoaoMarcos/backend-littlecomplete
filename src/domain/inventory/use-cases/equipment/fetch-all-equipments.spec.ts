import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { Equipment } from '../../entity/equipment';
import { makeCreateEquipment } from '../factories/make-create-equipment';
import { FetchAllEquipmentsUseCase } from './fetch-all-equipments';

let equipmentsRepository: InMemoryEquipmentRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: FetchAllEquipmentsUseCase;

describe('Find All Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new FetchAllEquipmentsUseCase(equipmentsRepository);
  });

  it('should be able list all Equipments', async () => {
    await equipmentsRepository.equipments.push(
      makeCreateEquipment(),
      makeCreateEquipment(),
      makeCreateEquipment(),
      makeCreateEquipment(),
      makeCreateEquipment(),
      makeCreateEquipment(),
    );

    const { equipments, totalCount } = await sut.execute({
      params: {},
    });

    expect(equipments[0]).toBeInstanceOf(Equipment);
    expect(totalCount).toEqual(6);
  });
});
