export interface IResponse {
  status: number;
  message: string;
}

export interface ISuccessResponse extends IResponse {
  data: any;
}

export interface IErrorResponse extends IResponse {
  stack: string;
}
