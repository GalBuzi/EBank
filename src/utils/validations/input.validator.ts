import { ObjectAny, IValidationStringToFuncPointer } from './types.validations.js';
//check that all keys on object
function checkForRequiredFields(obj: ObjectAny, keys: string[]): string[] {
  const ans: string[] = [];
  keys.forEach(k => {
    if (!(k in obj)) {
      ans.push(`${k} is required`);
    }
  });

  if (ans.length > 0) return ans;
  return ['true'];
}

function checkForNonValidFields(obj: ObjectAny, keys: string[]): string[] {
  const ans: string[] = [];
  keys.forEach(k => {
    if (k in obj) {
      ans.push(`${k} is not supposed to be sent`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function isNumeric(obj: ObjectAny, keys: string[]): string[] {
  const ans: string[] = [];
  keys.forEach((key) => {
    const conv = Number(obj[key]);
    if (isNaN(conv)) {
      ans.push(`${key} is not numeric`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function isDigitCountMatch(obj: ObjectAny, keys: string[], values: string[]): string[] {
  const ans: string[] = [];
  keys.forEach((key, i) => {
    if (
      !isNumeric(obj, keys).every(c => c === 'true') ||
      obj[key].toString().length !== Number(values[i])
    ) {
      ans.push(`${key} is not ${values[i]} digits long`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function isPositiveNumber(obj: ObjectAny, keys: string[]): string[] {
  const ans: string[] = [];
  keys.forEach(key => {
    if (!(Number(obj[key]) > 0)) {
      ans.push(`${key} is not positive number`);
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function areTuplesContainNumericNonNegative(obj: ObjectAny, keys: string[]): string[] {
  const ans: string[] = [];

  keys.forEach(key => {
    if (isNaN(Number(obj[key][0])) || obj[key][1] < 0){
      ans.push(`found invalid tuple (${obj[key][0]},${obj[key][1]})`);
    }
  });

  if (ans.length > 0) return ans;
  return ['true'];
}

function validateTuplesStructure(obj: ObjectAny, keys: string[], values: string[]): string[] {
  const ans: string[] = [];
  keys.forEach(key => {
    const tuples: number[][] = obj[key];
    if (tuples && Array(tuples)) {
      tuples.forEach(t => {
        if (!Array(t) || t.length !== 2 || typeof t[0] !== values[0] || typeof t[1] !== values[1]) {
          ans.push('found wrong tuple');
        }
      });
    } else {
      ans.push('no tuples found');
    }
  });
  if (ans.length > 0) return ans;
  return ['true'];
}

function checkTuplesSumToMin(obj: ObjectAny, keys: string[], values: string[]): string[] {
  const ans: string[] = [];
  let sum = 0;
  keys.forEach(key => {
    const tuples: number[][] = obj[key];
    tuples.forEach(t => {
      if (t[1]) sum += Number(t[1]);
    });
  });
  if (sum < Number(values[0])) ans.push(`sum is less than ${values[0]}`);
  if (ans.length > 0) return ans;
  return ['true'];
}

function arraysNotEmpty(obj: ObjectAny, keys: string[]): string[] {
  keys.forEach(key=>{
    if (obj[key].length === 0){
      return ['found an empty list'];
    }
  });

  return ['true'];
}

export const inputValidationStringToFuncPointer: IValidationStringToFuncPointer = {
  checkForRequiredFields: checkForRequiredFields,
  checkForNonValidFields: checkForNonValidFields,
  isDigitCountMatch: isDigitCountMatch,
  isPositiveNumber: isPositiveNumber,
  isNumeric: isNumeric,
  validateTuplesStructure: validateTuplesStructure,
  checkTuplesSumToMin: checkTuplesSumToMin,
  areTuplesContainNumericNonNegative: areTuplesContainNumericNonNegative,
  arraysNotEmpty: arraysNotEmpty,
};
