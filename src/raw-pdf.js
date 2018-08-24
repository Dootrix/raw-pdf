require('./extensions/regexp-extensions');
import PDFObjectFactory from './pdf-object-factory';

class RawPDF {
  constructor(data) {
    this.data = data;
  }

  get objects() {
    return /^(\d+)\s(\d+)\sobj\n((?:.|\n)*?)\nendobj$/gm.execAll(this.data)
      .map(m => PDFObjectFactory.for(parseInt(m[1]), parseInt(m[2]), m[3]));
  }
}

module.exports = RawPDF;
