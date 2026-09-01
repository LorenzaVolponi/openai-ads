import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const authoritySurfaces = [
  { path: "/", label: "home" },
  { path: "/en", label: "english authority hub" },
  { path: "/en/volponi-ai-index", label: "Volponi AI Index" },
] as const;

for (const surface of authoritySurfaces) {
  test(`${surface.label} has no serious or critical WCAG violations`, async ({ page }) => {
    await page.goto(surface.path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const blocking = result.violations.filter((violation) =>
      violation.impact === "critical" || violation.impact === "serious"
    );

    expect(
      blocking,
      blocking
        .map((violation) => `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`)
        .join("\n")
    ).toEqual([]);
  });
}

test("Raposa IA keeps keyboard focus inside the dialog and restores it on close", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const launcher = page.getByRole("button", { name: /Abrir assistente Raposa IA/i }).first();
  await expect(launcher).toBeVisible();
  await launcher.click();

  const dialog = page.getByRole("dialog");
  const input = page.getByRole("textbox", { name: /Digite sua pergunta/i });
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();

  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press(index % 2 === 0 ? "Tab" : "Shift+Tab");
    const focusIsInside = await dialog.evaluate((node) => node.contains(document.activeElement));
    expect(focusIsInside).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(launcher).toBeFocused();
});

test("security and CSP discovery are present without blocking the application", async ({ request }) => {
  const home = await request.get("/");
  expect(home.ok()).toBe(true);
  expect(home.headers()["content-security-policy-report-only"]).toContain("report-uri /api/csp-report");
  expect(home.headers()["reporting-endpoints"]).toContain("csp-endpoint");

  const security = await request.get("/.well-known/security.txt");
  expect(security.ok()).toBe(true);
  const text = await security.text();
  expect(text).toContain("Canonical: https://openai-ads.volponi.tech/.well-known/security.txt");
  expect(text).toContain("Preferred-Languages: pt-BR, en");
});
