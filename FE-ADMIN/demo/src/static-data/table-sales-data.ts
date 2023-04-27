import { DateTime } from 'luxon';
import { roomType } from 'src/app/core/model/room-type';

export interface Order {
  name: string;
  price: string;
  status: 'ready' | 'pending' | 'warn';
  timestamp: string;
}

export const tableSalesData: roomType[] = [

];
