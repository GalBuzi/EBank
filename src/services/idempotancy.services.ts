import builderSQL from '../utils/builder.utils.js';

export async function insertResponseToDB(accessKey : string, idemKey: string,
  response:string, allParams:string): Promise<void>{
  //take from req the response and save in db by idem_key
  await builderSQL.insertResponseToDB(accessKey, idemKey, response, allParams);
}