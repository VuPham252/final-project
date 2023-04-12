export interface checkAva {
  inputCheckinDate: string,
  inputCheckoutDate: string,
  roomTypeId: number,
  amount?: number
}

export interface Booking {
  bookingRequestList: [checkAva],
  customerName: string,
  email: string,
  phoneNumber: string
}
