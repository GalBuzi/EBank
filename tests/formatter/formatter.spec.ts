import { expect } from 'chai';
import FORMATTER from '../../src/utils/format.utils.js';
import {individualRow,individualDto} from '../builder/individual.mock.js';
import {businessDto,buisnessRow} from '../builder/business.mock.js';
import * as familyMock from '../builder/family.mock.js';
import {familyRow} from '../builder/family.mock.js';
describe("Testing the formatter class", ()=>{
    context("#formatToIndividualDTO()", ()=>{
        it("Should format the given individual row to individual account dto",  ()=>{
            const individualAccountDto = FORMATTER.formatToIndividualDTO(individualRow);
            expect(individualAccountDto).to.deep.equal(individualDto)
         })
    })
    context("#formatToBusinessDTO",()=>{
        it("Should format the given business row to business account dto",  ()=>{
            const businessAccountDto = FORMATTER.formatToBusinessDTO(buisnessRow);
            expect(businessAccountDto).to.deep.equal(businessDto)
         })
    })
    context("#formatToFamilyDTO",()=>{
        it("Should format the given family row to family account dto",  ()=>{
            const familyAccountDto = FORMATTER.formatDataToFamilyDTO(familyRow);            
            expect(familyAccountDto).to.deep.equal(familyMock.familyDTO)
         })
    })
})