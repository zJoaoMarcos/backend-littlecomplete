export class DepartmentNotFoundError extends Error {
  constructor() {
    super('Department not found');
  }
}
