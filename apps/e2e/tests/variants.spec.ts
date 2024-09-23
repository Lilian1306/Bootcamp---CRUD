import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page).toHaveURL('http://localhost:5173/');
  
  const colorCapacityText = page.getByText('Color: Blue Black Capacity:')
  await expect(colorCapacityText).toBeVisible();

  await colorCapacityText.click();

});