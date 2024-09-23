import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  const searchInput = page.getByPlaceholder('Search by name')
  await expect(searchInput).toBeVisible();

  await searchInput.click();
  await searchInput.press('CapsLock');
  await searchInput.fill('G');
  await searchInput.press('CapsLock');
  await searchInput.fill('Galaxy');

  const productImage = page.getByRole('img', {name: 'Galaxy A15 5G'});
  await expect(productImage).toBeVisible();

  await productImage.click();

  const productTitle = page.getByRole('heading', {name: 'Galaxy A15 5G'});
  await expect(productTitle).toBeVisible();
  
});
