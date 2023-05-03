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
