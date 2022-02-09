import { HttpException } from './HttpException.exceptions.js';
export class ValidationException extends HttpException {
  constructor(public message: string, public statusCode: number = 404) {
    super(message, statusCode);
  }
}
