import { HttpException } from '@nestjs/common';

export class EquipmentIsUnavailableError extends HttpException {
  constructor() {
    super('Equipment is unavaliable', 404);
  }
}
