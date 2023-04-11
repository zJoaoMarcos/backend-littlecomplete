import { Department } from './department';

describe('Department', () => {
  it('should create a new department', () => {
    const department = new Department(
      'IOT',
      242042,
      false,
      'Tecnologia da Informação',
    );

    expect(department).toBeInstanceOf(Department);
    expect(department.name).toEqual('IOT');
  });
});
