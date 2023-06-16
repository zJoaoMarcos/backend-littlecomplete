export class UserNameAlreadyExistsError extends Error {
  constructor() {
    super('User name already exists');
  }
}
