import { HttpException } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', 404);
  }
}
