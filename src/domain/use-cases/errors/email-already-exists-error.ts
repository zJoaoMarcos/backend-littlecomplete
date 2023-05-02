import { HttpException } from '@nestjs/common';

export class EmailAlreadyExistsError extends HttpException {
  constructor() {
    super('User name already exits', 409);
  }
}
