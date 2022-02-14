// import sinon, { restore } from 'sinon';
import { expect } from 'chai';
import {
  IAccountDTO,
  IBusinessAccountDTO,
  IFamilyAccountDTOLong,
  IIndividualAccountDTO,
} from '../../src/types/dto.types.js';
import * as BusiLogicFuncs from '../../src/utils/validations/business.logic.validations.js';

describe('testing validation functions used to validate business logic of source and destination ', () => {
  // afterEach(() => restore());

  context('#isValidTypesB2B', () => {
    it('should return true for two accounts of type business', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2B(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should return error message for source account which is not business type', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2B(source, destination);
      expect(ans).to.deep.equal(['source type must be business']);
    });

    it('should return error message for destination account which is not business type', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2B(source, destination);
      expect(ans).to.deep.equal(['destination type must be business']);
    });
  });

  context('#isValidTypesB2I', () => {
    it('should return true for source is business type and destination is individual type', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2I(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should return error message for source account which is not business type', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2I(source, destination);
      expect(ans).to.deep.equal(['source type has to be business']);
    });

    it('should return error message for destination account which is not individual type', () => {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesB2I(source, destination);
      expect(ans).to.deep.equal(['destination type has to be individual']);
    });
  });

  context('#isValidTypesF2B', () => {
    it('should return true for source is business type and destination is individual type', () => {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesF2B(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should return error message for source account which is not family type', () => {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isValidTypesF2B(source, destination);
      expect(ans).to.deep.equal(['source type must be family']);
    });

    it('should return error message for detination account which is not business type', () => {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isValidTypesF2B(source, destination);
      expect(ans).to.deep.equal(['destination type must be business']);
    });

    it('should return error message for source owner account which is not individual type', () => {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'business',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isValidTypesF2B(source, destination);
      expect(ans).to.deep.equal(['found owner which is not individual']);
    });
  });

  context('#isAllGivenType', () => {
    it('should return true for array of acount of the same given type', () => {
      const a1: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const a2: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const a3: IAccountDTO = {
        account_id: 3,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isAllGivenType([a1, a2, a3], 'business');
      expect(ans).to.deep.equal(['true']);
    });


    it('should return error message for finding one account that doesnt of given type', () => {
      const a1: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const a2: IAccountDTO = {
        account_id: 2,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const a3: IAccountDTO = {
        account_id: 3,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isAllGivenType([a1, a2, a3], 'business');
      expect(ans).to.deep.equal(['account type must be business']);
    });

  });

  context('#isSameCurrency', ()=> {
    it('should be true for source and destination with same curerncy', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isSameCurrency(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source and destination with different curerncy', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'USD',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isSameCurrency(source, destination);
      expect(ans).to.deep.equal(['currency must be the same']);
    });
  });

  context('#isDifferentCurrency', ()=> {
    it('should be true for source and destination with different curerncy', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'USD',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isDifferentCurrency(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source and destination with same curerncy', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isDifferentCurrency(source, destination);
      expect(ans).to.deep.equal(['currency must be different']);
    });
  });

  context('#isSameCurrencyF2B', ()=> {
    it('should be true for source, owners and destination with same curerncy', ()=> {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isSameCurrencyF2B(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source and destination with different curerncy', ()=> {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'USD',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isSameCurrencyF2B(source, destination);
      expect(ans).to.deep.equal(['currency must be the same']);
    });

    it('should be error message for source and owners with different curerncy', ()=> {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'USD',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };
      const ans = BusiLogicFuncs.isSameCurrencyF2B(source, destination);
      expect(ans).to.deep.equal(['found owner with different currency']);
    });
  });

  context('#isValidBalanceB2B', ()=> {
    it('should be true for transfer that source remain balance is more than 10,000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 2500;

      const ans = BusiLogicFuncs.isValidBalanceB2B(source, destination, amount);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source remain balance less than 10,000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 25000;

      const ans = BusiLogicFuncs.isValidBalanceB2B(source, destination, amount);
      expect(ans).to.deep.equal(['business source account must remain with at least 10000 after transfer to business account']);
    });
  });

  context('#isValidBalanceB2I', ()=> {
    it('should be true for transfer that source remain balance is more than 10,000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 2500;

      const ans = BusiLogicFuncs.isValidBalanceB2I(source, destination, amount);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source remain balance less than 10,000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'individual',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 25000;

      const ans = BusiLogicFuncs.isValidBalanceB2I(source, destination, amount);
      expect(ans).to.deep.equal(['business source account must remain with at least 10000 after transfer to individual account']);
    });
  });

  context('#isValidBalanceF2B', ()=> {
    it('should be true for transfer that source remain balance is more than 5000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 2500;

      const ans = BusiLogicFuncs.isValidBalanceF2B(source, destination, amount);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source remain balance less than 5000', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const amount = 26000;

      const ans = BusiLogicFuncs.isValidBalanceF2B(source, destination, amount);
      expect(ans).to.deep.equal(['family source account must remain with at least 5000 after transfer to business account']);
    });
  });

  context('#isActiveAccounts', ()=> {
    it('should be true for source and destination are active status', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isActiveAccounts(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source inactive', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 2,
        status_name: 'INACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isActiveAccounts(source, destination);
      expect(ans).to.deep.equal(['source status must be active']);
    });

    it('should be error message for destination inactive', ()=> {
      const source: IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 2,
        status_name: 'INACTIVE',
      };

      const ans = BusiLogicFuncs.isActiveAccounts(source, destination);
      expect(ans).to.deep.equal(['destination status must be active']);
    });
  });

  context('#isActiveAccountsF2B', ()=> {
    it('should be true for source, owners and destination are active status', ()=> {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isActiveAccountsF2B(source, destination);
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message for source owner inactive', ()=> {
      const source: IFamilyAccountDTOLong = {
        family_account_id: 1,
        account_id: 1,
        type_name: 'family',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
        context: 'Savings',
        owners: [
          {
            account_id: 111,
            currency: 'EUR',
            balance: 12135,
            status_id: 2,
            type_name: 'individual',
            status_name: 'INACTIVE',
            individual_account_id: 111,
            individual_id: 1234567,
            first_name: 'gal',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 1,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 6,
            },
          },
          {
            account_id: 112,
            currency: 'EUR',
            balance: 12135,
            status_id: 1,
            type_name: 'individual',
            status_name: 'ACTIVE',
            individual_account_id: 112,
            individual_id: 1234567,
            first_name: 'dfgsdf',
            last_name: 'b',
            email: 'gdsgf@sdfg.fgg',
            address: {
              address_id: 2,
              country_name: 'Israel',
              country_code: 'ISR',
              postal_code: 23425,
              city: 'Tel Aviv',
              region: 'none',
              street_name: 'Laskov',
              street_number: 7,
            },
          },
        ],
      };

      const destination: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isActiveAccountsF2B(source, destination);
      expect(ans).to.deep.equal(['owner gal b has account with inactive status']);
    });
  });

  context('#isAllStatusGivenAccounts', ()=> {
    it('should be true - all accounts are able to be deactivated', ()=> {
      const a1 : IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const a2: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const a3 : IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isAllStatusGivenAccounts([a1, a2, a3], 'deactivate');
      expect(ans).to.deep.equal(['true']);
    });

    it('should be error message because one of the accounts is already inactive', ()=> {
      const a1 : IAccountDTO = {
        account_id: 1,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const a2: IAccountDTO = {
        account_id: 2,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 2,
        status_name: 'INACTIVE',
      };

      const a3 : IAccountDTO = {
        account_id: 3,
        type_name: 'business',
        currency: 'EUR',
        balance: 30000,
        status_id: 1,
        status_name: 'ACTIVE',
      };

      const ans = BusiLogicFuncs.isAllStatusGivenAccounts([a1, a2, a3], 'deactivate');
      expect(ans).to.deep.equal(['can not perform deactivate on INACTIVE account']);
    });

    context('#isLimitValidB2B', ()=> {
      it('should be true for transfer 2 businesses in same company that transfer less than 10000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 1234,
          company_name: 'Apple',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 4,
          company_id: 1234,
          company_name: 'Apple',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
  
        const amount = 8900;
  
        const ans = BusiLogicFuncs.isLimitValidB2B(source, destination, amount);
        expect(ans).to.deep.equal(['true']);
      });

      it('should be error for transfer 2 businesses in same company that transfer more than 10000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 1234,
          company_name: 'Apple',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 4,
          company_id: 1234,
          company_name: 'Apple',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
  
        const amount = 18900;
  
        const ans = BusiLogicFuncs.isLimitValidB2B(source, destination, amount);
        expect(ans).to.deep.equal(['Amount must be under or equal to 10000 for same company']);
      });
  
      it('should be true for transfer 2 businesses in different company that transfer less than 1000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 4321,
          company_name: 'DELL',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 4,
          company_id: 1234,
          company_name: 'APPLE',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const amount = 250;
  
        const ans = BusiLogicFuncs.isLimitValidB2B(source, destination, amount);
        expect(ans).to.deep.equal(['true']);
      });

      it('should be error for transfer 2 businesses in different company that transfer more than 1000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 4321,
          company_name: 'DELL',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 4,
          company_id: 1234,
          company_name: 'APPLE',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const amount = 2250;
  
        const ans = BusiLogicFuncs.isLimitValidB2B(source, destination, amount);
        expect(ans).to.deep.equal(['Amount must be under or equal to 1000 for different companies']);
      });
    });

    context('#isLimitValidB2I', ()=> {
  
      it('should be true for transfer from businesses to individual transfer less than 1000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 4321,
          company_name: 'DELL',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IIndividualAccountDTO = {
          account_id: 111,
          currency: 'EUR',
          balance: 12135,
          status_id: 1,
          type_name: 'individual',
          status_name: 'ACTIVE',
          individual_account_id: 111,
          individual_id: 1234567,
          first_name: 'gal',
          last_name: 'b',
          email: 'gdsgf@sdfg.fgg',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const amount = 250;
  
        const ans = BusiLogicFuncs.isLimitValidB2I(source, destination, amount);
        expect(ans).to.deep.equal(['true']);
      });

      it('should be error for transfer from business to individual that transfer more than 1000', ()=> {
        const source: IBusinessAccountDTO = {
          account_id: 1,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
          business_account_id: 1,
          company_id: 4321,
          company_name: 'DELL',
          context: 'dfasdf',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const destination: IIndividualAccountDTO = {
          account_id: 111,
          currency: 'EUR',
          balance: 12135,
          status_id: 1,
          type_name: 'individual',
          status_name: 'ACTIVE',
          individual_account_id: 111,
          individual_id: 1234567,
          first_name: 'gal',
          last_name: 'b',
          email: 'gdsgf@sdfg.fgg',
          address: {
            address_id: 1,
            country_name: 'Israel',
            country_code: 'ISR',
            postal_code: 23425,
            city: 'Tel Aviv',
            region: 'none',
            street_name: 'Laskov',
            street_number: 6,
          },
        };
  
        const amount = 2250;
  
        const ans = BusiLogicFuncs.isLimitValidB2I(source, destination, amount);
        expect(ans).to.deep.equal(['Amount must be under or equal to 1000 while transfring from business account to individual account']);
      });
    });

    context('#isLimitValidF2B', ()=> {
  
      it('should be true for transfer from family to business transfer less than 5000', ()=> {
        const source: IAccountDTO = {
          account_id: 1,
          type_name: 'family',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
        };
  
        const destination: IAccountDTO = {
          account_id: 2,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
        };
  
        const amount = 4250;
  
        const ans = BusiLogicFuncs.isLimitValidF2B(source, destination, amount);
        expect(ans).to.deep.equal(['true']);
      });

      it('should be error for transfer from family to business that transfer more than 5000', ()=> {
        const source: IAccountDTO = {
          account_id: 1,
          type_name: 'family',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
        };
  
        const destination: IAccountDTO = {
          account_id: 2,
          type_name: 'business',
          currency: 'EUR',
          balance: 30000,
          status_id: 1,
          status_name: 'ACTIVE',
        };
  
        const amount = 24250;
  
        const ans = BusiLogicFuncs.isLimitValidF2B(source, destination, amount);
        expect(ans).to.deep.equal(['Amount must be under or equal to 5000 while transfring from family account to business account']);
      });
    });
  });
});
