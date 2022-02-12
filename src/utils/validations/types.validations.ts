export interface ValidationConfig {
  routes: RouteConfig[];
  transfers_mutual_validation : string[];
  transfers_individual_validation: TransferConfig[];
  input_validation_options: string[];
  transfers_validation_options: string[];
}

interface RouteConfig {
  route: string;
  validation_functions: InputValidationFuncConfig[];
}

interface InputValidationFuncConfig {
  func_name: string;
  params: string[];
  params_values: string[];
}

interface TransferConfig {
  transfer_type: string;
  validation_functions: string[];
}

export interface IValidationStringToFuncPointer {
  [key: string]: (...args: any) => string[];
}

export interface ObjectAny {
  [key: string]: any;
}

export enum InputValidationPerRoute {
  createBusinessAccount = 'createBusinessAccount',
  getBusinessAccountById = 'getBusinessAccountById',
  createIndividualAccount = 'createIndividualAccount',
  getIndividualAccountById = 'getIndividualAccountById',
  createFamilyAccount = 'createFamilyAccount',
  getFamilyAccountById = 'getFamilyAccountById',
  transferB2B = 'transferB2B',
  transferB2I = 'transferB2I',
  transferF2B = 'transferF2B',
}

export enum TransferValidationPerRoute {
  validateTransferB2B = 'validateTransferB2B',
  validateTransferB2I = 'validateTransferB2I',
  validateTransferB2BFX = 'validateTransferB2BFX',
  validateTransferF2B = 'validateTransferF2B',

}
