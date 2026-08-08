export type ErrorParameters = ConstructorParameters<typeof Error>;

export class CustomError extends Error {
  constructor(...args: ErrorParameters) {
    super(...args);
    this.name = this.constructor.name;
  }
}

export class ConfigError extends CustomError {
  configName: string;

  constructor(configName: string, ...args: ErrorParameters) {
    super(...args);
    this.configName = configName;
  }

  report() {
    if (this.message) {
      console.warn(`[${this.configName}] ${this.message}`);
    } else if (this.cause instanceof Error && this.cause.message) {
      console.warn(`[${this.configName}] ${this.cause.message}`);
    } else {
      console.warn(`[${this.configName}] Unknown config error`);
    }
  }
}

export type ConfigErrorParameters = ConstructorParameters<typeof ConfigError>;

export class AggregateConfigError extends ConfigError {
  errors: Array<ConfigError>;

  constructor(errors: Iterable<ConfigError>, ...args: ConfigErrorParameters) {
    super(...args);
    this.errors = Array.from(errors);
  }

  override report() {
    this.errors.forEach((error) => error.report());
  }
}
