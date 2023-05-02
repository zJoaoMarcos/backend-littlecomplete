import { HttpException } from '@nestjs/common';

export class EmailAlreadyExistsError extends HttpException {
  constructor() {
    super('E-mail already exists', 409);
  }
}
