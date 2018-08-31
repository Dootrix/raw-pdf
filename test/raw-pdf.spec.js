'use strict';
const expect = require('chai').expect;
const fs = require('fs');
const RawPDF = require('../src/raw-pdf');
const {PDFObject, PDFDictionary, PDFStream} = require('../src/objects');

const VALID_DOCUMENT_PATH = __dirname + '/fixtures/Sale of Goods Act 1979.pdf';

describe('RawPDF', () => {
  it('is not an empty object', () => {
    expect(RawPDF).not.to.eql({});
  });

  describe('#version', () => {
    describe('when we have a valid document', () => {
      const data = fs.readFileSync(VALID_DOCUMENT_PATH, 'utf8');
      const parser = new RawPDF(data);

      it('returns the version', () => {
        expect(parser.version).to.eql('1.3');
      });
    });

    describe('when we have an invalid document', () => {
      const definition = [
        'I AM NOT',
        'A',
        'VALID',
        'PDF Document'
      ].join("\n");
      const data = Buffer.from(definition);
      const parser = new RawPDF(data);

      it('returns a default version', () => {
        expect(parser.version).to.eql('0.0');
      });
    });
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

    describe('can read a PDF file', () => {
      const data = fs.readFileSync(VALID_DOCUMENT_PATH, 'utf8');
      const parser = new RawPDF(data);

      it('contains objects', () => {
        expect(parser.objects).not.to.be.empty;
      });
    });
  });
});
