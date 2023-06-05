import { HttpException } from '@nestjs/common';

export class DepartmentNotFoundError extends HttpException {
  constructor() {
    super('Department not found', 404);
  }
}
