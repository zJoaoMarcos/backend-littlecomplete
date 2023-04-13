import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateEquipmentUseCase } from './create-equipment';
import { FindAllEquipmentsUseCase } from './find-all-equipments';

describe('Find All Equipments Use Case', () => {
  it('should be able list all Equipments', async () => {
    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
    );
    const findAllEquipments = new FindAllEquipmentsUseCase(equipmentRepository);

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
      findAllEquipments.execute();
    }).resolves;
  });
});
