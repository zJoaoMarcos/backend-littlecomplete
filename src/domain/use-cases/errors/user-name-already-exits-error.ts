import { HttpException } from '@nestjs/common';

export class UserNameAlreadyExistsError extends HttpException {
  constructor() {
    super('User name already exists', 409);
  }
}
