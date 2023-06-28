export class StatusChangeNotAllowedError extends Error {
  constructor() {
    super('Status not allowed, user still has assignments');
  }
}
