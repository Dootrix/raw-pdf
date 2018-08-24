'use strict';
const expect = require('chai').expect;
const PDFObjectFactory = require('../src/pdf-object-factory');
const {PDFObject, PDFDictionary, PDFStream} = require('../src/objects');

describe('PDFObjectFactory', () => {
  describe('#for', () => {
    it('returns a PDFObject', () => {
      const objectId = 1;
      const generationId = 2;
      const data = 'my data';
      expect(PDFObjectFactory.for(objectId, generationId, data)).to.eql(
        new PDFObject(objectId, generationId, data)
      );
    });

    it('returns a PDFDictionary if it is a dictionary', () => {
      const objectId = 1;
      const generationId = 2;
      const data = '<< /Length 2 >>';
      expect(PDFObjectFactory.for(objectId, generationId, data)).to.eql(
        new PDFDictionary(objectId, generationId, data)
      );
    });

    it('returns a PDFStream if it is a stream', () => {
      const objectId = 1;
      const generationId = 2;
      const data = [
        '<< /Length 2 >>',
        'stream',
        '1234567890',
        'endstream'
      ].join("\n");
      expect(PDFObjectFactory.for(objectId, generationId, data)).to.eql(
        new PDFStream(objectId, generationId, data)
      );
    });
  });
});
