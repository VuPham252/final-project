export class roomType {
  id: number;
  typeName: string;
  price: number;
  description: string;
  shortDescription: string;
  area: number;
  extraService: string;
  layout: string;
  size: number;

  constructor() {
    this.id = 0
    this.typeName = "";
    this.price = 0;
    this.description = "";
    this.shortDescription = "";
    this.area = 0;
    this.size = 0;
    this.extraService = "";
    this.layout = "";
  }
}

export class imgResponseList {
  imgEncodeString: string;
  fileCode: string;

  constructor() {
    this.imgEncodeString = '';
    this.fileCode = '';
  }
}
