import { HttpError } from "./http.error";

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
