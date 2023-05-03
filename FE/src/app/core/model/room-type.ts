export class roomType {
  id: number;
  imgResponseList?: [imgResponseList];
  typeName: string;
  price: number;

  constructor() {
    this.id = 0;
    this.typeName = '';
    this.price = 0;
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
