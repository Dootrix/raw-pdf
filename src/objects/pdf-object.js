class PDFObject {
  constructor(objectId, generationId, data) {
    this.objectId = objectId;
    this.generationId = generationId;
    this.data = data;
  }
}

module.exports = PDFObject;
