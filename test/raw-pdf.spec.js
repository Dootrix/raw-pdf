'use strict';
const expect = require('chai').expect;
const RawPDF = require('../src/raw-pdf');

describe('RawPDF', () => {
  it('works', () => {
    expect(RawPDF).not.to.eql({});
  })
});