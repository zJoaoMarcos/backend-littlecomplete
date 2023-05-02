import { HttpException } from '@nestjs/common';

export class EmailAlreadyExistsError extends HttpException {
  constructor() {
    super('E-mail already exits', 409);
  }
}
