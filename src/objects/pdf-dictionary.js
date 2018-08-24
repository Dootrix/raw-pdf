require('../extensions/regexp-extensions');
import PDFObject from './pdf-object';

class PDFDictionary extends PDFObject {
  constructor(objectId, generationId, data) {
    super(objectId, generationId, data);
    this.dictionary = PDFDictionary.extract(data);
  }
}

PDFDictionary.extract =  data => {
  return /^\s*\/(.*?)\s(.+)$/gm.execAll(data).reduce((r, m) => {
    r[m[1]] = m[2];
    return r;
  }, {});
};

module.exports = PDFDictionary;
