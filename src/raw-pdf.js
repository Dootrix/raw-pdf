require('./extensions/regexp-extensions');
import PDFObjectFactory from './pdf-object-factory';

class RawPDF {
  constructor(data) {
    this.data = data;
  }

  get version() {
    return (/^%PDF-(.*)$/m.exec(this.data) || [])[1] || '0.0';
  }

  get objects() {
    return /^(\d+)\s(\d+)\sobj\n((?:.|\n)*?)\nendobj$/gm.execAll(this.data)
      .map(m => PDFObjectFactory.for(parseInt(m[1]), parseInt(m[2]), m[3]));
  }
}

module.exports = RawPDF;
