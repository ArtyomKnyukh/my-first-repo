export class CheckoutOverviewPage{
  constructor(page){
    this.page=page;

    this.orderInfo=page.locator('div.summary_info');
    this.totalPrice=page.locator('[data-test="total-label"]');
    this.cancelButton=page.locator('[data-test="cancel"]');
    this.finishButton=page.locator('[data-test="finish"]');
  }

  async finishCheckout(){
    await this.finishButton.click();
  }

  async cancelCheckout(){
    await this.cancelButton.click();
  }
}
