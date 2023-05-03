export interface checkAva {
  inputCheckinDate: string,
  inputCheckoutDate: string,
  roomTypeId: number,
  roomTypeName?: string,
  roomTypePrice?: number,
  amount?: number,
  isDisabled?: boolean,
  isAvailable?: boolean,
}

export interface Booking {
  bookingRequestList: [checkAva],
  customerName: string,
  email: string,
  phoneNumber: string
}
