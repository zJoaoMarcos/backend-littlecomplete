import { HttpException } from '@nestjs/common/exceptions';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('User already exits', 409);
  }
}
