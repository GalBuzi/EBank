import { HttpException } from './HttpException.exceptions.js';
export class ServerException extends HttpException {
  constructor(public message: string, public statusCode: number = 500) {
    super(message, statusCode);
  }
}
