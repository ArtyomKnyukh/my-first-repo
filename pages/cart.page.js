export class CartPage{
  constructor(page){
    this.page=page;

    this.cartList=page.locator('[data-test="cart-list"]');
    this.backToShoppingButton=page.locator('[data-test="continue-shopping"]');
    this.checkoutButton=page.locator('[data-test="checkout"]');
  }

  async getProductNameFromCart() {
    return this.cartList.locator('[data-test="inventory-item-name"]').textContent();;
  }
  async goToCheckout(){
    await this.checkoutButton.click();
  }

  async backToShopping(){
    await this.backToShoppingButton.click();
  }
}