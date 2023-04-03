import { HttpException } from '@nestjs/common/exceptions';

export class DepartmentNotFoundError extends HttpException {
  constructor() {
    super('Department not found', 404);
  }
}
