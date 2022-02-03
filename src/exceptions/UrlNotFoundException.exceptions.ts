import { HttpException } from './HttpException.exceptions.js';
export class UrlNotFoundException extends HttpException {
  constructor(public message: string, public statusCode: number = 404) {
    super(message, statusCode);
  }
}