import { HttpException } from '@nestjs/common';

export class EquipmentIsUnavailableError extends HttpException {
  constructor() {
    super('Equipment is unavailable', 404);
  }
}
