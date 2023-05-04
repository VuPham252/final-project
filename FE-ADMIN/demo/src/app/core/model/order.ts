export class Order {
  id: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  createdTime?: string;

  constructor() {
    this.id = 0
    this.customerName = "";
    this.email = "";
    this.phoneNumber=  "";
    this.createdTime = new Date().toISOString();
  }
}

export class OrderDetail {
  id: number;
  amount: number;
  checkInDate: string;
  checkOutDate: string;
  roomId: number;
  roomTypeId: number;
  status: string;

  constructor() {
    this.id = 0;
    this.roomId = 0;
    this.roomTypeId = 0;
    this.amount = 0;
    this.checkInDate = '';
    this.checkOutDate = '';
    this.status = '';
  }
}
