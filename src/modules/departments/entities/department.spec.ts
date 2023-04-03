import { Department } from './department';

describe('Department', () => {
  it('should create a new department', () => {
    const department = new Department({
      name: 'IOT',
      cost_center: 2420424,
      is_board: false,
      board: 'Tecnologia da Informação',
    });

    expect(department).toBeInstanceOf(Department);
    expect(department.name).toEqual('IOT');
  });
});
