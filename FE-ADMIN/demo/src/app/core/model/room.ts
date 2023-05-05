export class Room {
  id: number;
  name: string;
  roomTypeId: number;
  description: string;
  area: number;
  size: number

  constructor() {
    this.id = 0
    this.name = "";
    this.roomTypeId = 0;
    this.description=  "";
    this.area = 0;
    this.size = 0;
  }

}
