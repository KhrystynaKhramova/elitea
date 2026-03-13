import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work', () => {
  test('Client Work page is visible', async ({ page }) => {
    // Navigate and wait for network to settle
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    // Dismiss cookie/consent banner if present (best-effort)
    const acceptButtons = page.getByRole('button', { name: /accept|agree|accept all|agree and continue/i });
    if (await acceptButtons.count() > 0) {
      await acceptButtons.first().click();
    }

    // Reveal Services menu — try hover first, fallback to click
    const services = page.getByRole('link', { name: /services/i }).first();
    await services.hover().catch(() => {});
    // Ensure the menu is open — clicking is a safe fallback
    await services.click();

    // Find and click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
    await expect(exploreLink).toBeVisible({ timeout: 5000 });
    await exploreLink.click();

    // Wait for navigation and verify the "Client Work" text is visible
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/^Client Work$/i)).toBeVisible({ timeout: 5000 });
  });
});
