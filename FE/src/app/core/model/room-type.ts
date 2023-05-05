export class roomType {
  id: number;
  imgResponseList?: [imgResponseList];
  typeName: string;
  price: number;
  description: string;
  shortDescription: string;

  constructor() {
    this.id = 0;
    this.typeName = '';
    this.price = 0;
    this.description = '';
    this.shortDescription = '';
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
