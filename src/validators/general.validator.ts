class GeneralValidator {

  //check that all keys on object
  mandatory(obj: Object, keys : string[]){
    return true;
  }

  isPrimaryExist(obj : Object, key: string){
    return true;
  }

  isSevenDigits(num : number){
    return true;
  }

  isEightDigits(num:number){
    return true;
  }

  sumUpToMinRequired(tuples : number[][], minSum : number){

  }

  isPositiveNumber(num : number[]){
    return num.every(n=> n >= 0);
  }

  isLengthNotZero(arr : any[]){
    return arr.length > 0;
  }

  isNumeric(numbers : number[]){

  }

}

const instance = new GeneralValidator();
export default instance;