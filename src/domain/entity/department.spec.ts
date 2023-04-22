import { Department } from './department';

describe('Department', () => {
  it('should create a new department', () => {
    const department = Department.create({
      name: 'IOT',
      cost_center: 242042,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    expect(department).toBeInstanceOf(Department);
    expect(department.name).toEqual('IOT');
  });
});
