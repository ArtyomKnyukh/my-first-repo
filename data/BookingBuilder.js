export default class BookingBuilder {
  constructor(firstname, lastname){
    this.booking = {
      firstname: firstname,
      lastname: lastname
    }
  }

  withTotalPrice(price){
    this.booking.totalprice = price;
    return this;
  }

  withDeposit(status){
    this.booking.depositpaid = status;
    return this;
  }

  withBookingDates(checkin, checkout){
    this.booking.bookingdates = {
      checkin: checkin,
      checkout: checkout
    };
    return this;
  }

  withAdditionalNeeds(additionalNeeds){
    this.booking.additionalneeds = additionalNeeds;
    return this;
  }

  build() {
    return this.booking;
  }
}