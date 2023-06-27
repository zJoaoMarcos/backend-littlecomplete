export class ItemWithSameNameAlreadyExistsError extends Error {
  constructor() {
    super('Item with same name already exists');
  }
}
