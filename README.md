# 🦷 Dent App Frontend

Frontend aplikacji **Dental Scheduler** – systemu planowania grafików dla przychodni dentystycznej. Zbudowany w oparciu o **Nuxt 3 (Vue 3)** i komunikuje się z backendem Laravel przez REST API.

---

## 📦 Stack technologiczny

* **Nuxt 3** – framework Vue 3
* **TypeScript**
* **Vite**
* **Tailwind CSS / Nuxt UI** (opcjonalnie)
* **ESLint + Prettier** – linting
* **Husky + lint-staged** – Git hooks
* **Playwright** – testy E2E
* **Vitest** – testy jednostkowe (opcjonalnie)

---

## 📁 Struktura projektu

```
dent_app_frontend/
├── assets/
├── components/
├── composables/
├── layouts/
├── pages/
├── tests/         # Playwright
├── public/
├── nuxt.config.ts
└── package.json
```

---

## ⚙️ Wymagania

* Node.js >= 18
* npm lub pnpm

---

## 🚀 Instalacja

```bash
npm install
```

### ▶️ Uruchomienie w trybie developerskim

```bash
npm run dev
```

Dostępne pod:

```
http://localhost:3000
```

### 🏗 Build produkcyjny

```bash
npm run build
npm run preview
```

---

## 🔌 Zmienne środowiskowe

Utwórz plik `.env` w katalogu projektu:

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

---

## 🔐 Autoryzacja

* Token JWT otrzymywany z backendu (Laravel)
* Przechowywany w composable (`useAuth`) lub Pinia
* Automatycznie dodawany w nagłówkach `Authorization` przy `useFetch` lub Axios

---

## 🧪 Testy

### E2E (Playwright)

```bash
npx playwright install
npm run test:e2e
```

Pliki testowe znajdują się w katalogu:

```
/tests/e2e
```

---

## 🧹 Linting

```bash
npm run lint
npm run lint:fix
```

---

## 🪝 Husky (Git hooks)

* Pre-commit: ESLint + Prettier

Instalacja hooków:

```bash
npx husky install
```

---

## 🔄 Workflow Git

```
main
 └── develop
      └── feature/*
      └── bugfix/*
```

* Brak commitów bezpośrednio do `main`
* Każdy feature → Pull Request

---

## 📄 Licencja

Projekt – tylko do użytku przychodni dentystycznej.
