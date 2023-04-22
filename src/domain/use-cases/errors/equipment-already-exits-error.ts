import { HttpException } from '@nestjs/common';

export class EquipmentAlreadyExistsError extends HttpException {
  constructor() {
    super('Equipment already exits', 409);
  }
}
