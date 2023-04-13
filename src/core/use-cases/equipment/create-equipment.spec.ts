import { InMemoryEquipmentRepository } from '../../../infra/repository/in-memory/in-memory-equipment-repository';
import { CreateEquipmentUseCase } from './create-equipment';

describe('Create Equipment Use Case', () => {
  it('Should be able create Equipment', async () => {
    const equipmentRepository = new InMemoryEquipmentRepository();
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
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
    const createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentRepository,
    );

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
    ).rejects.toThrowError('Department already exits');
  });
});
