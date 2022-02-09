import fs from 'fs';

//check that all keys on object
function checkForRequiredFields(obj: ObjectAny, keys : string[]) : string[]{  
  const ans : string[] = []; 
  keys.forEach(k => {
    if (!(k in obj)){
      ans.push(`${k} is required`);
    }
  });

  if (ans.length > 0) return ans;
  return ['true'];
}

function checkForNonValidFields(obj: ObjectAny, keys : string[]) : string[]{
  const ans : string[] = []; 
  keys.forEach(k => {
    if (k in obj){
      ans.push(`${k} is not required`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}


function isNumeric(obj: ObjectAny, keys:string[], values:string[]) : string[]{
  const ans : string[] = [];
  keys.forEach( (key, i) => {
    const conv = Number(obj[key]);
    console.log(conv);
    if (isNaN(conv)){
      ans.push(`${key} is not ${values[i]} numeric`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function isDigitCountMatch(obj: ObjectAny, keys:string[], values:string[]) : string[]{
  const ans : string[] = [];
  keys.forEach( (key, i) => {
    if (isNumeric(obj, keys, values).every(c=>c === 'true') && 
     obj[key].toString().length !== Number(values[i])){
      ans.push(`${key} is not ${values[i]} digits long`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function isPositiveNumber(obj: ObjectAny, keys:string[], values:string[]) : string[]{
  const ans : string[] = [];
  keys.forEach( (key, i) => {
    if (!(Number(obj[key]) > 0)){
      ans.push(`${key} is not ${values[i]} positive number`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

export interface ValidationConfig {
  routes : RouteConfig[]
  validation_options : string[]
}

interface RouteConfig { 
  route : string;
  validation_functions : ValidationFuncConfig[]
}

interface ValidationFuncConfig {
  func_name: string
  params : string[],
  params_values : string[],
  // expected_result: string,
  // failure_result: string
}

function initValidationConfig(): ValidationConfig {
  return JSON.parse(
    fs.readFileSync(process.cwd() + '/validation.json', 'utf-8'),
  ) as ValidationConfig;
}

export const validationConfigObj = initValidationConfig();

interface IValidationStringToFuncPointer {
  [key : string] : (...args : any) => string[];
}

interface ObjectAny {
  [key : string] : any
}

export const validationStringToFuncPointer : IValidationStringToFuncPointer = {
  'checkForRequiredFields': checkForRequiredFields,
  'checkForNonValidFields':checkForNonValidFields,
  'isDigitCountMatch' : isDigitCountMatch,
  'isPositiveNumber' : isPositiveNumber,
  'isNumeric' : isNumeric,
};

export enum ValidationPerRoute {
  createBusinessAccount = 'createBusinessAccount',
  getBusinessAccountById = 'getBusinessAccountById',
  createIndividualAccount = 'createIndividualAccount',
  getIndividualAccountById = 'getIndividualAccountById',
  createFamilyAccount = 'createFamilyAccount',
  getFamilyAccountById = 'getFamilyAccountById',
}


