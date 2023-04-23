export class Booking {
  id: number;
  orderId: number;
  roomTypeId: number;
  roomId: number;
  amount: number
  checkInDate: string;
  checkOutDate: string;

  constructor() {
    this.id = null
    this.orderId = null;
    this.roomTypeId = null;
    this.roomId=  null;
    this.amount= null;
    this.checkInDate=  "";
    this.checkOutDate = "";
  }

}
