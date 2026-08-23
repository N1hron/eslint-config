export class NamedError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = this.constructor.name;
  }
}

export class InnerError extends NamedError {}

export class InnerAggregateError extends InnerError {
  errors: Array<InnerError>;

  constructor(errors: Iterable<InnerError>, ...args: ConstructorParameters<typeof InnerError>) {
    super(...args);
    this.errors = Array.from(errors);
  }

  get length() {
    return this.errors.length;
  }

  [Symbol.iterator]() {
    return this.errors[Symbol.iterator]();
  }
}
