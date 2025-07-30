class ResultsPage {
  constructor(page) {
    this.page = page;
    this.checkIn = 'text="Check In"';
    this.availableRoomsSelector = '[data-testid^="roomItem-"]';
    this.seePrices = '[data-testid="see-prices-btn-rates-page"]'
    this.roomPrices = '[data-testid="room-price-list-item"]';
    this.addToCartButton = '[data-testid="add-to-cart-btn-rates-page"]';
    this.checkoutButton = '[data-testid="btnCheckoutOnCart"]'
    this.addAddressText = 'text="Add Address Manually"';
  }

  async availableRooms() {
    await this.page.waitForSelector(this.seePrices)
    const rooms = await this.page.$$(this.availableRoomsSelector);
    return rooms.length;
  }

  async addRoomToCart() {
    await this.page.click(this.seePrices);
    await this.page.waitForSelector(this.roomPrices);
    const roomPrices = await this.page.$$(this.roomPrices);
    if (roomPrices.length > 0) {
      await this.page.click(this.addToCartButton);
      await this.page.waitForSelector(this.checkoutButton);
      await this.page.click(this.checkoutButton);
      await this.page.waitForSelector(this.addAddressText);
      console.log('Room added to cart successfully.');
    } else {
      console.log('Room not added');
    }
  }

}

module.exports = ResultsPage;
