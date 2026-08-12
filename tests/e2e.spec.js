import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { ClientInformationPage } from '../pages/client.information.page';
import { CheckoutOverviewPage } from '../pages/checkout.overview.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';

test('testing e2e scenario(buying cycle for a user)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const clientInformationPage = new ClientInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login('standard_user','secret_sauce');

  const pageTitle = await inventoryPage.getPageTitle();
  await expect(pageTitle).toHaveText("Products");
  //сортировка по цене от дорогого к дешёвому
  await inventoryPage.sortProducts("hilo");
  //выбор первого элемента из списка
  const addedProduct = await inventoryPage.addItemToCart(0);
  await inventoryPage.openCart();

  //проверка корзины
  expect (addedProduct).toBe(await cartPage.getProductNameFromCart());

  await cartPage.goToCheckout();
  await clientInformationPage.fillUserInfo("Test","User","12345");
  await clientInformationPage.continueCheckout();
  await checkoutOverviewPage.finishCheckout();

  const finishPageTitle = await checkoutCompletePage.getCompletionMessage();
  await expect(finishPageTitle).toHaveText("Thank you for your order!");
});