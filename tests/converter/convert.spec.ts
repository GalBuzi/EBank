import * as individualMock from '../mocks/individual.mock.js';
import * as businessMock from '../mocks/business.mock.js';
import * as familyMock from '../mocks/family.mock.js';
import CONVERTER, { FormatterMapper } from '../../src/utils/covnert.utils.js';
import { expect } from 'chai';
describe("Testing the convert function",()=>{
    context("#convertRowsDataToDTO()", ()=>{
        it("Should return an IIndividualAccountDTO, by the given RowDataIndividual",()=>{
            const individualDto = CONVERTER.convertRowsDataToDTO([individualMock.individualRow],FormatterMapper.formatToIndividualDTO);
            expect(individualDto).to.deep.equal([individualMock.individualDto]);
        })
        it("Should return an IBusinessAccountDTO, by the given RowDataBusiness",()=>{
            const businesslDto = CONVERTER.convertRowsDataToDTO([businessMock.buisnessRow],FormatterMapper.formatToBusinessDTO);
            expect(businesslDto).to.deep.equal([businessMock.businessDto]);
        })
        it("Should return an IFamilyAccountDTO, by the given RowDataFamily",()=>{
            const familylDto = CONVERTER.convertRowsDataToDTO([familyMock.familyRow],FormatterMapper.formatDataToFamilyDTO);
            expect(familylDto).to.deep.equal([familyMock.familyDTO]);
        })
    })
})