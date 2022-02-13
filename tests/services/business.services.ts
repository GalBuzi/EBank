import { expect } from 'chai';
import { afterEach } from 'mocha';
import sinon from 'sinon';
import buildeSQL from '../../src/utils/builder.utils.js';

describe('Business Service', () => {
  let getBusinessByIdSTUB: Function;

  context('get business by id', () => {
    before(() => {
      getBusinessByIdSTUB = sinon.stub(buildeSQL, 'getBusinessAccountById').returns;
    });

    afterEach(()=>{});
    
    
  });
});

//describe for each module
// context for each method
// it for testing action
