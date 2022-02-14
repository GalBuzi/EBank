import EXTRACTOR from '../../src/utils/extraction.utils.js';
import * as individualMock from '../builder/individual.mock.js';
import * as extractorMock from './extractor.mock.js';
import sinon, { restore } from 'sinon';
import { expect } from 'chai';

describe("Testing the extractor functions used in every creational request",async ()=>{
    it("Should extract the account record from the given model",async ()=>{
        const accountRecord = EXTRACTOR.extractAccountRecord(individualMock.individualModel);
        expect(accountRecord).to.deep.equal(extractorMock.accountRecord);
    })
    // it("Should extract the owners id from the interface's given tuple [[id,amount]...]",async()=>{
    //     expect(ex)
    // })
})
