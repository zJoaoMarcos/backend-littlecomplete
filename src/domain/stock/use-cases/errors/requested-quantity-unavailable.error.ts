export class RequestedQuantityUnavailableError extends Error {
  constructor() {
    super('Requested quantity unavailable');
  }
}
