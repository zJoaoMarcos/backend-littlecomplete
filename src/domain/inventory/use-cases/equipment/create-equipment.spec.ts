import { DepartmentNotFoundError } from '@/domain/employees/use-cases/errors/department-not-found-error';
import { makeCreateDepartment } from '@/domain/employees/use-cases/factories/make-create-department';
import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { InMemoryEquipmentRepository } from '@/infra/repository/in-memory/in-memory-equipment-repository';
import { faker } from '@faker-js/faker';
import { EquipmentAlreadyExistsError } from '../errors/equipment-already-exits-error';
import { makeCreateEquipment } from '../factories/make-create-equipment';
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
    await departmentsRepository.departments.push(
      makeCreateDepartment({ id: 2 }),
    );

    const { equipment } = await sut.execute({
      id: 'generic-id',
      patrimony: 'generic-patrimony',
      purchaseDate: faker.date.recent(),
      slots: 0,
      currentUser: faker.internet.userName(),
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
    });
    expect(equipment).toBeTruthy();
    expect(equipment.departmentId).toEqual(2);
  });

  it('Should not be able create Equipment with department nonexistent', async () => {
    await departmentsRepository.departments.push(
      makeCreateDepartment({ id: 2 }),
    );

    await expect(() =>
      sut.execute({
        id: 'generic-id',
        patrimony: 'generic-patrimony',
        purchaseDate: faker.date.recent(),
        slots: 0,
        currentUser: faker.internet.userName(),
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
        departmentId: 999,
        invoice: 'generic-invoice',
        model: 'generic-model',
      }),
    ).rejects.toBeInstanceOf(DepartmentNotFoundError);
  });

  it('Should not be able create Equipment with id twice', async () => {
    await departmentsRepository.departments.push(
      makeCreateDepartment({ id: 2 }),
    );

    await equipmentsRepository.equipments.push(
      makeCreateEquipment({
        id: 'id-twice',
      }),
    );

    await expect(() =>
      sut.execute({
        id: 'id-twice',
        patrimony: 'generic-patrimony',
        purchaseDate: faker.date.recent(),
        slots: 0,
        currentUser: faker.internet.userName(),
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
    ).rejects.toBeInstanceOf(EquipmentAlreadyExistsError);
  });
});
