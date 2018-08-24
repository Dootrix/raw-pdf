'use strict';
const expect = require('chai').expect;
require('../../src/extensions/regexp-extensions');

describe('RegExp', () => {
  describe('#execAll', () => {
    it('returns the first match', () => {
      expect(/(apple|banana|pear|orange)/.execAll('banana,apple,pear')).to.eql([
        ['banana', 'banana']
      ]);
    });

    it('returns all matches when the global flag is set', () => {
      expect((/(apple|banana|pear|orange)/g).execAll('banana,apple,pear')).to.eql([
        ['banana', 'banana'],
        ['apple', 'apple'],
        ['pear', 'pear']
      ]);
    });
  });
});