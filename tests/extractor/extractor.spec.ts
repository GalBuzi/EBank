import EXTRACTOR from '../../src/utils/extraction.utils.js';
import * as individualMock from '../mocks/individual.mock.js';
import * as businessMock from '../mocks/business.mock.js';
import * as familyMock from '../mocks/family.mock.js';
import { expect } from 'chai';

describe("Testing the extractor functions used in every creational request",()=>{
    context("#extractAccountRecord()", ()=>{
        it("Should extract the account record from the given model", ()=>{
            const accountRecord = EXTRACTOR.extractAccountRecord(individualMock.individualModel);
            expect(accountRecord).to.deep.equal(individualMock.accountToInsert);
        })
    })
    context("#extractAddressRecord()", ()=>{
        it("Should extract the address record from the given model",()=>{
            const addressRecord = EXTRACTOR.extractAddressRecord(individualMock.individualModel)
            expect(addressRecord).to.deep.equal(individualMock.addressToInsert);
        })
    })
    context("#extractAddressRecord()", ()=>{
        it("Should extract the individual record from the given model", () =>{
            const individualRecord = EXTRACTOR.extractIndividualRecord(individualMock.individualModel);
            expect(individualRecord).to.deep.equal(individualMock.individualToInsertNoIds);
        })
    })
    context("#extractAddressRecord()", ()=>{
        it("Should extract the business record from the given model",()=>{
            const businessRecord = EXTRACTOR.extractBusinessRecord(businessMock.businessModel);
            expect(businessRecord).to.deep.equal(businessMock.businessToInsertNoIds);
        })
    })
    context("#extractAddressRecord()", ()=>{
        it("Should extract the family record from the given model", ()=>{
            const familyRecord = EXTRACTOR.extractFamilyRecord(familyMock.familyModel);
            expect(familyRecord).to.deep.equal(familyMock.familyToInsertNoId);
        })
    })
    context("#extractAddressRecord()", ()=>{
        it("Should extract the onwer's id's from the given model -[[id,amount]...]",()=>{
            const ownersIds = EXTRACTOR.extractOwnersIds(familyMock.familyModel);
            expect(ownersIds).to.deep.equal(familyMock.owners);
        })
    })
})
