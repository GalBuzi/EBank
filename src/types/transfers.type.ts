export interface ITransferDataModel {
  id: number;
  balance: number;
  currency: string;
}

export interface ITransferResult {
  sourceAccount: ITransferDataModel;
  destinationAccount: ITransferDataModel;
}

export interface ITransferModel {
  sourceAccount: number;
  destinationAccount: number;
  amount: number;
}

export interface IRateResult {
  success: boolean;
  timestamp: Date;
  base: string;
  date: Date;
  rates: { [key: string]: string };
}
