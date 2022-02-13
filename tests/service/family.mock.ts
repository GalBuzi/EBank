import { IAccountDTO, IFamilyAccountDTOShort } from "../../src/types/dto.types";
import { IAccountRecord, IFamilyAccountRecord } from "../../src/types/records.type";
import { RowDataFamily } from "../../src/types/rowData.types";

export const accountToInsertFamily : IAccountRecord = {
    "currency": "ILS",
    "balance" : 10000,
    "status_id" : 1,
    "type_name" : "family"
}

export const familyRecord : IFamilyAccountRecord = {
    "account_id" : 4,
    "context" : "Some context"
}

export const familyAccountDto : IAccountDTO = {
    "account_id" : 4,
    "status_name" : "active",
    "currency": "ILS",
    "balance": 10000,
    "status_id": 1,
    "type_name": "family",
}
export const rowFamily : RowDataFamily = {
    "account_id" : 4,
    "status_name" : "active",
    "currency": "ILS",
    "balance": 10000,
    "status_id": 1,
    "type_name": "family",
    "context" : "Some context",
    "family_account_id" : 6
}
export const familyDto : IFamilyAccountDTOShort ={
    "account_id" : 4,
    "status_name" : "active",
    "currency": "ILS",
    "balance": 10000,
    "status_id": 1,
    "type_name": "family",
    "owners" : [1,2,3],
    "context" : "Some context",
    "family_account_id" : 6
}