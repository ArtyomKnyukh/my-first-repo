export class InventoryPage{
  constructor(page) {
    this.page=page;

    this.title= page.locator('[data-test="title"]');
    this.productSortIcon= page.locator('[data-test="product-sort-container"]');
    this.cartIcon= page.locator('[data-test="shopping-cart-link"]');
    this.inventoryList= page.locator('[data-test="inventory-item"]');
  }

  async openCart(){
    await this.cartIcon.click();
  }

  getPageTitle(){
    return this.title;
  }

  async sortProducts(option){
    await this.productSortIcon.selectOption(option);
  }

  async addItemToCart(itemIndex){
    const itemButton = this.inventoryList.nth(itemIndex).locator(".btn.btn_inventory");
    const productName= await this.inventoryList.nth(itemIndex).locator('[data-test="inventory-item-name"]').textContent();
    await itemButton.click();
    //возврат названия продукта, который был добавлен
    return productName;
  }
  
}