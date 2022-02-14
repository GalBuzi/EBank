import { IIndividualAccountDTO, IAddressDTO, IAccountDTO } from "../../src/types/dto.types"
import { IAddressModel, IIndividualAccountModel } from "../../src/types/models.types"
import { IAccountRecord, IAddressRecord, IIndividualAccountRecord } from "../../src/types/records.type"
import { RowDataIndividual } from "../../src/types/rowData.types"

export const individualDto : IIndividualAccountDTO =  {
    "individual_account_id" : 31,
    "individual_id": 14,
    "first_name": "gal",
    "last_name": "hara",
    "email": "hara",
    "account_id": 91,
    "currency": "ILS",
    "balance": 3000,
    "status_id": 1,
    "status_name": "INACTIVE",
    "type_name": "individual",
    "address": {
        "address_id": 42,
        "street_name": "hara",
        "street_number": 123,
        "postal_code": 45,
        "country_code": "hara",
        "country_name": "hara",
        "city": "hara",
        "region": "hara"
    }
}
export const addressIndividualDto : IAddressDTO = {
    "address_id" : 5,
    "country_name" : "Israel",
    "country_code" : "ISR",
    "postal_code" : 45,
    "city" : "Petah Tikva",
    "region" : "Merkaz",
    "street_name" : "Ehad Haam",
    "street_number" : 1
}
export const addressModel : IAddressModel = {
    "country_name" : "Israel",
    "country_code" : "ISR",
    "postal_code" : 45,
    "city" : "Petah Tikva",
    "region" : "Merkaz",
    "street_name" : "Ehad Haam",
    "street_number" : 1
}
export const individualModel : IIndividualAccountModel = {
    "type_name" : "individual",
    "currency" : "ILS",
    "balance" : 10000,
    "status_id" : 1,
    "individual_id" : 66,
    "first_name" : "gal",
    "last_name" : "brakan",
    "email" : "hgal@gmail.com",
    "address" : addressModel
}

export const individualAccountDto : IAccountDTO = {
    "account_id" : 1,
    "status_name" : "active",
    "currency": "ILS",
    "balance": 10000,
    "status_id": 1,
    "type_name": "individual",
}

export const individualRow : RowDataIndividual = {
    "individual_id" : 65,
    "type_name" : "individual",
    "status_name" : "active",
    "status_id" : 1,
    "account_id" : 1,
    "individual_account_id" : 31,
    "currency" : "ILS",
    "city" : "Petah Tikva",
    "country_code" : "ISR",
    "country_name" : "Israel",
    "balance" : 10000,
    "address_id" : 5,
    "postal_code" : 45,
    "region" : "hara",
    "street_name" : "hara",
    "street_number" : 123,
    "first_name": "gal",
    "last_name": "brakan",
    "email": "gal@gmail.com",
}

export const accountToInsert : IAccountRecord = {
    "currency": "ILS",
    "balance" : 10000,
    "status_id" : 1,
    "type_name" : "individual",
}
export const addressToInsert : IAddressRecord = {
    "city" : "Petah Tikva",
    "country_code" : "ISR",
    "country_name" : "Israel",
    "postal_code" : 45,
    "region" : "hara",
    "street_name" : "Ehad Haam",
    "street_number" : 1
}
export const individualToInsert : IIndividualAccountRecord = {
    "first_name": "gal",
    "last_name": "brakan",
    "email": "gal@gmail.com",
    "individual_id" : 65,
    "account_id" : 1,
    "address_id" : 5
}