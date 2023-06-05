import { randomInt } from 'node:crypto';
import { Department } from './department';

describe('Department', () => {
  it('should create a new department', () => {
    const department = Department.create({
      id: randomInt(1, 1000),
      name: 'IOT',
      cost_center: 2485353,
      is_board: false,
      board: 'Tecnologia da Informação',
      responsible_id: 'carlos.alexandre',
    });

    expect(department).toBeInstanceOf(Department);
    expect(department.name).toEqual('IOT');
  });
});
