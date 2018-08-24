import PDFObject from './pdf-object';
import PDFDictionary from './pdf-dictionary';

class PDFStream extends PDFObject {
  constructor(objectId, generationId, data) {
    super(objectId, generationId, data);
    this.dictionary = PDFDictionary.extract(data);
    this.stream = PDFStream.extract(data);
  }
}

PDFStream.extract = data => {
  return /^stream\n((?:.|\n)*?)endstream$/gm.exec(data)[1];
};

module.exports = PDFStream;
