require('dotenv').config();
const CardNumber = process.env.CardNumber;

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.payButton = '[data-testid="pay-btn-summary"]'
    this.title = '#booking-summary-form-title'
    this.success = 'text="Payment Successful"';
    this.bookingNumber = 'text="Booking Number:"';
  }

  async fillDetails() {
    await this.page.getByRole('combobox', { name: 'Title' }).click();
    await this.page.getByRole('option', { name: 'Dr' }).click();    await this.page.getByRole('textbox', { name: 'First Name *' }).click();
    await this.page.getByRole('textbox', { name: 'First Name *' }).fill('Testt');
    await this.page.getByRole('textbox', { name: 'Last Name *' }).click();
    await this.page.getByRole('textbox', { name: 'Last Name *' }).fill('est');
    await this.page.getByRole('textbox', { name: 'Email Address *' }).click();
    await this.page.getByRole('textbox', { name: 'Email Address *' }).fill('test@t.com');
    await this.page.getByRole('textbox', { name: 'Email Address *' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill('23452345');
    await this.page.getByRole('textbox', { name: 'Address Finder' }).click();
    await this.page.getByRole('textbox', { name: 'Address Finder' }).fill('10 downing ', { delay: 200 });
    await this.page.getByText('10 Downing Street, London, UK').click();

    await this.page.frameLocator('iframe[title="Iframe for card number"]').getByRole('textbox', { name: 'Card number' }).click();
    await this.page.frameLocator('iframe[title="Iframe for card number"]').getByRole('textbox', { name: 'Card number' }).fill(CardNumber);
    await this.page.frameLocator('iframe[title="Iframe for expiry date"]').getByRole('textbox', { name: 'Expiry date' }).click();
    await this.page.frameLocator('iframe[title="Iframe for expiry date"]').getByRole('textbox', { name: 'Expiry date' }).fill('03/30');
    await this.page.frameLocator('iframe[title="Iframe for security code"]').getByRole('textbox', { name: 'Security code' }).click();
    await this.page.frameLocator('iframe[title="Iframe for security code"]').getByRole('textbox', { name: 'Security code' }).fill('737');
    await this.page.getByRole('textbox', { name: 'Name on card' }).fill('test');
    await this.page.click(this.payButton);
    // confirm success message
    await this.page.waitForSelector(this.bookingNumber);
    const bookingText = await this.page.locator(this.bookingNumber).innerText();
    const match = bookingText.match(/\d{8}/);
    expect(match).not.toBeNull(); // Assert that an 8-digit number exists
    expect(match[0]).toHaveLength(8); // Assert that it is exactly 8 digits
  }

}

module.exports = CheckoutPage;
