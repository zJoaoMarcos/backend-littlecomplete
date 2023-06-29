export class AdministratorWithSameEmailAlreadyExistsError extends Error {
  constructor() {
    super('User with same email already exists');
  }
}
