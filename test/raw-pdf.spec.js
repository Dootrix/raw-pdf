'use strict';
const expect = require('chai').expect;
const RawPDF = require('../src/raw-pdf');
const {PDFObject, PDFDictionary, PDFStream} = require('../src/objects');

describe('RawPDF', () => {
  it('is not an empty object', () => {
    expect(RawPDF).not.to.eql({});
  });

  describe('#objects', () => {
    describe('when we have simple objects', () => {
      const definition = [
        '1 0 obj',
        '123',
        'endobj'
      ].join("\n");
      const data = Buffer.from(definition);
      const parser = new RawPDF(data);

      it('returns a list of PDFObject', () => {
        expect(parser.objects).to.eql([new PDFObject(1, 0, "123")]);
      });
    });

    describe('when we have dictionaries', () => {
      const definition = [
        '1 0 obj',
        '<<',
        '  /Title (Overview of Amazon Web Services - AWS Whitepaper)',
        '  /Author (AWS)',
        '  /Creator (ZonBook XSL Stylesheets with Apache FOP)',
        '  /Producer (Apache FOP Version 2.1)',
        '  /CreationDate (D:20180723205229Z)',
        '>>',
        'endobj'
      ].join("\n");
      const data = Buffer.from(definition);
      const parser = new RawPDF(data);

      it('returns a list of PDFDictionary', () => {
        expect(parser.objects).to.eql([
          new PDFDictionary(1, 0, definition.replace("1 0 obj\n", '').replace("\nendobj", ''))
        ]);
      });
    });

    describe('when we have streams', () => {
      const definition = [
        '1 0 obj',
        '<<',
        '  /N 3',
        '  /Length 3 0 R',
        '  /Filter /FlateDecode',
        '>>',
        'stream',
        'I am a stream',
        'endstream',
        'endobj'
      ].join("\n");
      const data = Buffer.from(definition);
      const parser = new RawPDF(data);

      it('returns a list of PDFStream', () => {
        expect(parser.objects).to.eql([
          new PDFStream(1, 0, definition.replace("1 0 obj\n", '').replace("\nendobj", ''))
        ]);
      });
    });
  });
});
