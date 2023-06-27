import { faker } from '@faker-js/faker';
import { Department, DepartmentProps } from '../../entity/department';

export function makeCreateDepartment(override: Partial<DepartmentProps> = {}) {
  const department = Department.create({
    id: faker.number.int(),
    name: faker.commerce.department(),
    board: faker.commerce.department(),
    cost_center: faker.number.int({ max: 8000 }),
    is_board: faker.datatype.boolean(),
    responsible_id: faker.internet.userName(),
    ...override,
  });

  return department;
}
