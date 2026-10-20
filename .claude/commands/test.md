# Skill: /test

Piszesz testy Playwright dla funkcjonalności w projekcie dent_app_frontend.

## Kontekst projektu

- Frontend: Nuxt 3, Vue 3, shadcn-vue
- Backend API: Laravel, baza danych z UUID
- Dev URL: `http://localhost:3000`
- API URL: `http://localhost:8000/api`
- Testy w: `e2e/` (tworzone jeśli nie istnieją)

## Struktura testu

```typescript
// e2e/<feature>/<description>.spec.ts
import { test, expect } from '@playwright/test'

test.describe('<Feature> — <opis>', () => {
  test.beforeEach(async ({ page }) => {
    // logowanie lub nawigacja do strony
    await page.goto('/login')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')
    await page.waitForURL('**/dashboard')
  })

  test('powinien <opis akcji>', async ({ page }) => {
    // arrange
    await page.goto('/patients')

    // act
    await page.click('text=Dodaj pacjenta')

    // assert
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})
```

## Selektory — priorytety (od najlepszego)

1. `getByRole('button', { name: 'Zapisz' })` — semantyczne
2. `getByLabel('Imię')` — dla pól formularza
3. `getByText('Dodaj pacjenta')` — dla tekstu
4. `getByTestId('receipt-dialog')` — gdy potrzebny `data-testid`
5. CSS selector — ostateczność

## Wzorce do testowania

### Otwarcie dialogu i wypełnienie formularza

```typescript
test('dodaje receptę', async ({ page }) => {
  await page.goto('/patients/some-uuid')
  await page.click('text=Dodaj receptę')

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()

  // Select z shadcn
  await dialog.getByRole('combobox', { name: 'Typ recepty' }).click()
  await page.getByRole('option', { name: 'RP' }).click()

  await dialog.getByRole('button', { name: 'Zapisz' }).click()
  await expect(dialog).not.toBeVisible()
})
```

### Intercept API (mock odpowiedzi)

```typescript
test('wyświetla listę', async ({ page }) => {
  await page.route('**/api/patient/*/prescription', async (route) => {
    await route.fulfill({
      json: {
        data: [{ uuid: '1', code: 'RX001', status: 'active' }],
        current_page: 1, last_page: 1, per_page: 10, total: 1, from: 1, to: 1,
      },
    })
  })

  await page.goto('/patients/some-uuid')
  await expect(page.getByText('RX001')).toBeVisible()
})
```

### Weryfikacja tabeli

```typescript
// Sprawdź że tabela ma wiersz
await expect(page.getByRole('row')).toHaveCount(3) // 1 header + 2 wiersze danych

// Sprawdź zawartość komórki
await expect(page.getByRole('cell', { name: 'Jan Kowalski' })).toBeVisible()
```

### Upload pliku

```typescript
test('wgrywa zdjęcie', async ({ page }) => {
  await page.goto('/patients/some-uuid')
  await page.click('text=Dodaj zdjęcia')

  const fileInput = page.locator('input[type="file"]')
  await fileInput.setInputFiles('fixtures/test-image.jpg')

  await expect(page.getByText('Plik wgrany')).toBeVisible()
})
```

## Konfiguracja (playwright.config.ts — jeśli nie istnieje)

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
```

## Zasady

- Jeden test = jedna akcja użytkownika
- Nie testuj implementacji — testuj zachowanie widoczne dla użytkownika
- Używaj `await expect(...).toBeVisible()` zamiast sprawdzania DOM bezpośrednio
- Przy testach z API: mockuj zewnętrzne endpointy, nie testuj backendu
- Nazwa pliku: `<feature>.<akcja>.spec.ts` np. `receipt.add.spec.ts`
- Grupuj w `test.describe` po feature i scenariuszu

## Wywołanie

Użytkownik pisze np.:
> /test dodawanie recepty do pacjenta

Ty:
1. Pytasz o: czy mockować API? czy jest zalogowanie? jaki URL?
2. Tworzysz `e2e/<feature>/<action>.spec.ts`
3. Jeśli brak `playwright.config.ts` — tworzysz go
4. Pokazujesz jak uruchomić: `npx playwright test e2e/<plik>`
