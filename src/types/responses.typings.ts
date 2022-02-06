interface IResponse {
  status : number, 
  message : string
}

interface ISuccessResponse extends IResponse{
  data : any
}

interface IErrorResponse extends IResponse {
  stack : string
}