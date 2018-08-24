import {PDFObject, PDFDictionary, PDFStream} from './objects';

const PDFObjectFactory = {
  for(objectId, generationId, data) {
    if (data.includes('stream') && data.includes('endstream')) {
      return new PDFStream(objectId, generationId, data);
    }
    if (data.includes('<<') && data.includes('>>')) {
      return new PDFDictionary(objectId, generationId, data);
    }
    return new PDFObject(objectId, generationId, data);
  }
};

module.exports = PDFObjectFactory;
