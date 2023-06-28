export class InvalidStatusRequestError extends Error {
  constructor() {
    super('Invalid status request');
  }
}
