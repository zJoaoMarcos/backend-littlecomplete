import { HttpException } from '@nestjs/common';

export class EquipmentNotFoundError extends HttpException {
  constructor() {
    super('Equipment not found', 404);
  }
}
