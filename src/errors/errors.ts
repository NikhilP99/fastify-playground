export class InvalidRequestError extends Error {
  statusCode = 400
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedRequestError extends Error {
  statusCode = 401
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}