import sinon, { restore } from 'sinon';
import { expect } from 'chai';
import {
  IAccountDTO,
  IFamilyAccountDTOLong,
  IFamilyAccountDTOShort,
} from '../../src/types/dto.types.js';
import * as BusiLogicFuncs from '../../src/utils/validations/business.logic.validations.js';

//   'isSameCurrency':isSameCurrency,
//   'isDifferentCurrency' : isDifferentCurrency,
//   'isValidBalanceB2B' : isValidBalanceB2B,
//   'isValidBalanceB2I' : isValidBalanceB2I,
//   'isValidTypesB2I' : isValidTypesB2I,
//   'isActiveAccounts': isActiveAccounts,
//   'isLimitValidB2B' : isLimitValidB2B,
//   'isLimitValidB2I': isLimitValidB2I,
//   'isActiveAccountsF2B': isActiveAccountsF2B,
//   'isValidTypesF2B': isValidTypesF2B,
//   'isSameCurrencyF2B' : isSameCurrencyF2B,
//   'isValidBalanceF2B' : isValidBalanceF2B,
//   'isLimitValidF2B' : isLimitValidF2B,
//   'isAllGivenType' : isAllGivenType,
//   'isAllStatusGivenAccounts' : isAllStatusGivenAccounts,
//   'isNotGivenType' : isNotGivenType,

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

    it('should be error message for source and destination with different curerncy', ()=> {
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

    it('should be error message for source and owners with different curerncy', ()=> {
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
});
