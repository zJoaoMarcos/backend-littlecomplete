import { HttpException } from '@nestjs/common';

export class DepartmentAlreadyExistsError extends HttpException {
  constructor() {
    super('Department already exits', 409);
  }
}
