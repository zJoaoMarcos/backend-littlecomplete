import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { makeCreateEquipment } from './factories/make-create-equipment';
import { UpdateEquipmentStatusUseCase } from './update-equipment-status';

let equipmentsRepository: InMemoryEquipmentRepository;
let sut: UpdateEquipmentStatusUseCase;

describe('Update Equipment Status Use Case', () => {
  beforeAll(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    sut = new UpdateEquipmentStatusUseCase(equipmentsRepository);
  });

  it('should be able Update equipment status', async () => {
    equipmentsRepository.equipments.push(
      makeCreateEquipment({ id: 'generic-id', status: 'available' }),
    );

    const { equipment } = await sut.execute({
      equipment_id: 'generic-id',
      status: 'available',
    });

    expect(equipment.status).toEqual('available');
  });
});
