import { HttpException } from '@nestjs/common/exceptions';

export class DepartmentAlreadyExistsError extends HttpException {
  constructor() {
    super('Department already exits', 409);
  }
}
