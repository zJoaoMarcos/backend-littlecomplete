import { Department } from '../../../domain/entity/department';
import { InMemoryDepartmentRepository } from '../../../infra/repository/in-memory/in-memory-department-repository';
import { UpdateCostCenterDepartmentUseCase } from './update-cost-center-department';

let departmentRepository: InMemoryDepartmentRepository;
let sut: UpdateCostCenterDepartmentUseCase;

describe('Update Department Use Case', () => {
  beforeEach(() => {
    departmentRepository = new InMemoryDepartmentRepository();

    sut = new UpdateCostCenterDepartmentUseCase(departmentRepository);
  });

  it('should be able to update department props', async () => {
    const newDepartment = Department.create({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });
    departmentRepository.departments.push(newDepartment);

    const { department } = await sut.execute('IOT', 239239);

    expect(department.cost_center).toEqual(239239);
  });
});
