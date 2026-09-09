type ErrorParameters = ConstructorParameters<typeof Error>;

export class NamedError extends Error {
  constructor(...args: ErrorParameters) {
    super(...args);
    this.name = this.constructor.name;
  }
}

export class InnerError extends NamedError {}

export class InnerAggregateError extends InnerError {
  errors: Array<InnerError>;

  constructor(errors: Iterable<InnerError>, ...args: ErrorParameters) {
    super(...args);
    this.errors = Array.from(errors);
  }
}
