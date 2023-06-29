export class AdministratorNotFoundError extends Error {
  constructor() {
    super('administrator not found.');
  }
}
