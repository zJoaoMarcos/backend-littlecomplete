export class EquipmentIsUnavailableError extends Error {
  constructor() {
    super('Equipment is unavailable');
  }
}
