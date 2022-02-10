import fs from 'fs';
import { ObjectAny, IValidationStringToFuncPointer } from './types.validations.js';
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

function isPositiveNumber(obj: ObjectAny, keys:string[]) : string[]{
  const ans : string[] = [];
  keys.forEach( (key) => {
    if (!(Number(obj[key]) > 0)){
      ans.push(`${key} is not positive number`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function validateTuplesStructure(obj: ObjectAny, keys:string[]) : string[]{
  const ans : string[] = []; 
  keys.forEach( (key) => {
    const tuple = obj[key];
    if (obj[key] && Array(tuple)){
      if (tuple.length !== 2){
        ans.push('found wrong tuple');
      }
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function checkTuplesSumToMin(obj: ObjectAny, keys:string[], values:string[]) : string[]{
  const ans : string[] = []; 
  const isTupleArr = validateTuplesStructure(obj, keys);
  let sum = 0;
  if (isTupleArr.toString() === 'true'){
    keys.forEach( (key) => {
      const tuple = obj[key];
      sum += Number(tuple[1]);
    });
    if (sum < 5000) ans.push(`sum is less than ${values[0]}`);
  }
  return ['true'];
}


export const inputValidationStringToFuncPointer : IValidationStringToFuncPointer = {
  'checkForRequiredFields': checkForRequiredFields,
  'checkForNonValidFields':checkForNonValidFields,
  'isDigitCountMatch' : isDigitCountMatch,
  'isPositiveNumber' : isPositiveNumber,
  'isNumeric' : isNumeric,
  'validateTuplesStructure' : validateTuplesStructure,
  'checkTuplesSumToMin': checkTuplesSumToMin,
};




