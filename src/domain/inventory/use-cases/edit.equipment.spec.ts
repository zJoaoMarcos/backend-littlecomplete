import { DepartmentNotFoundError } from '@/domain/employees/use-cases/errors/department-not-found-error';
import { makeCreateDepartment } from '@/domain/employees/use-cases/factories/make-create-department';
import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { faker } from '@faker-js/faker';
import { EditEquipmentUseCase } from './edit-equipment';
import { makeCreateEquipment } from './factories/make-create-equipment';

let equipmentsRepository: InMemoryEquipmentRepository;
let departmentsRepository: InMemoryDepartmentRepository;
let sut: EditEquipmentUseCase;

describe('Edit Equipment Use Case', () => {
  beforeAll(() => {
    equipmentsRepository = new InMemoryEquipmentRepository();
    departmentsRepository = new InMemoryDepartmentRepository();
    sut = new EditEquipmentUseCase(equipmentsRepository, departmentsRepository);
  });

  it('should be able edit equipment props', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 22 }));
    equipmentsRepository.equipments.push(
      makeCreateEquipment({
        id: 'generic-id',
        brand: 'Dell',
        department: {
          id: 22,
          name: 'generic-name',
        },
      }),
    );

    const { equipment } = await sut.execute({
      id: 'generic-id',
      slots: 1,
      status: 'active',
      patrimony: 'generic-patrimony',
      purchaseDate: faker.date.recent(),
      video: 'generic-video',
      type: 'generic-video',
      warranty: 'generic-warranty',
      supplier: 'generic-supplier',
      serviceTag: 'generic-serviceTag',
      storage0Syze: faker.number.int(),
      storage0Type: 'generic-type',
      storage1Syze: faker.number.int(),
      storage1Type: 'generic-type',
      ram: 'generic-ram',
      brand: 'generic-brand',
      cpu: 'cpu',
      departmentId: 22,
      invoice: 'generic-invoice',
      model: 'generic-model',
    });

    expect(equipment.brand).toEqual('generic-brand');
  });

  it('should not be able to update department not registered', async () => {
    departmentsRepository.departments.push(makeCreateDepartment({ id: 22 }));
    equipmentsRepository.equipments.push(
      makeCreateEquipment({
        id: 'generic-id',
        brand: 'Dell',
        department: {
          id: 22,
          name: 'generic-name',
        },
      }),
    );

    expect(() =>
      sut.execute({
        id: 'generic-id',
        slots: 1,
        status: 'active',
        patrimony: 'generic-patrimony',
        purchaseDate: faker.date.recent(),
        video: 'generic-video',
        type: 'generic-video',
        warranty: 'generic-warranty',
        supplier: 'generic-supplier',
        serviceTag: 'generic-serviceTag',
        storage0Syze: faker.number.int(),
        storage0Type: 'generic-type',
        storage1Syze: faker.number.int(),
        storage1Type: 'generic-type',
        ram: 'generic-ram',
        brand: 'generic-brand',
        cpu: 'cpu',
        departmentId: 2,
        invoice: 'generic-invoice',
        model: 'generic-model',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });
});
