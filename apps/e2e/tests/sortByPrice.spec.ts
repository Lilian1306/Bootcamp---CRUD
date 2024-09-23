import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const sortDropdown = page.getByLabel('Sort by price:');
  await sortDropdown.selectOption('desc');
  await expect(sortDropdown).toHaveValue('desc');

  await sortDropdown.selectOption('asc');
  await expect(sortDropdown).toHaveValue('asc');
});