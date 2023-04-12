import { Department } from 'src/core/entity/department';
import { EntitySchema } from 'typeorm';

export const DepartmentSchema = new EntitySchema<Department>({
  name: 'departments',
  target: Department,
  tableName: 'departments',
  columns: {
    name: {
      primary: true,
      type: String,
    },
    cost_center: {
      type: String,
    },
    is_board: {
      type: Boolean,
    },
    board: {
      type: String,
    },
  },
});
