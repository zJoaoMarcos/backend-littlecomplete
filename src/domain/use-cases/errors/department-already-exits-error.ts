import { HttpException } from '@nestjs/common';

export class DepartmentAlreadyExistsError extends HttpException {
  constructor() {
    super('Department already exists', 409);
  }
}
