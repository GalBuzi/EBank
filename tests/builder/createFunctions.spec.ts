import sinon, { restore } from 'sinon';
import builderSQL from '../../src/utils/builder.utils.js';
import accountRepository from '../../src/repositories/SQLRepository/account.repository.js';
import { expect } from 'chai';
import addressRepository from '../../src/repositories/SQLRepository/address.repository.js';
import individualRepository from '../../src/repositories/SQLRepository/individual.repository.js';
import EXTRACTOR from '../../src/utils/extraction.utils.js';
import CONVERTER from '../../src/utils/covnert.utils.js';
import businessRepository from '../../src/repositories/SQLRepository/business.repository';
import * as individualMock from './individual.mock.js';
import * as businessMock from './business.mock.js';
import * as familyMock from './family.mock.js';
import familyRepository from '../../src/repositories/SQLRepository/family.repository.js';
describe('Testing creating individual account , business account, family account', () =>{
  afterEach(()=>restore());
  it('Should create a new individual account and return the DTO', async ()=>{
    sinon.stub(EXTRACTOR, 'extractAccountRecord').returns(individualMock.accountToInsert);
    sinon.stub(EXTRACTOR, 'extractAddressRecord').returns(individualMock.addressToInsert);
    sinon.stub(EXTRACTOR, 'extractIndividualRecord').returns(individualMock.individualToInsert);
    sinon.stub(addressRepository, 'createAddress').resolves(individualMock.addressIndividualDto);
    sinon.stub(accountRepository, 'createAccount').resolves(individualMock.individualAccountDto);
    sinon.stub(individualRepository, 'createIndividualAccount').resolves(individualMock.individualRow);
    sinon.stub(CONVERTER, 'convertRowsDataToDTO').returns([individualMock.individualDto]);
    const createdAccount = await builderSQL.createIndividualAccount(individualMock.individualModel);
    expect(createdAccount).to.deep.equal(individualMock.individualDto);
  });
  it('should create a new business account and return the DTO', async () =>{
    sinon.stub(EXTRACTOR, 'extractAccountRecord').returns(businessMock.accountToInsertBusiness);
    sinon.stub(EXTRACTOR, 'extractAddressRecord').returns(businessMock.addressToInsertBusiness);
    sinon.stub(EXTRACTOR, 'extractBusinessRecord').returns(businessMock.businessToInsert);
    sinon.stub(addressRepository, 'createAddress').resolves(businessMock.businessAddressdto);
    sinon.stub(accountRepository, 'createAccount').resolves(businessMock.businessAccounttDto);
    sinon.stub(businessRepository, 'createBusinessAccount').resolves(businessMock.buisnessRow);
    sinon.stub(CONVERTER, 'convertRowsDataToDTO').returns([businessMock.businessDto]);
    const createdAccount = await builderSQL.createBusinessAccount(businessMock.businessModel);
    expect(createdAccount).to.deep.equal(businessMock.businessDto);
  });

  // it("should create a new family account and return the DTO", async ()=>{
  //     sinon.stub(EXTRACTOR,'extractAccountRecord').returns(familyMock.accountToInsertFamily);
  //     sinon.stub(EXTRACTOR,'extractFamilyRecord').returns(familyMock.familyRecord);
  //     sinon.stub(EXTRACTOR,'extractOwnersIds').returns([1,2,3]);
  //     sinon.stub(accountRepository,'createAccount').resolves(familyMock.familyAccountDto);
  //     sinon.stub(familyRepository,'createFamilyAccount').resolves(familyMock.familyDto);
  // })
});