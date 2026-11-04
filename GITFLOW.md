# GITFLOW.md

Ten plik opisuje zasady pracy z gitem w projekcie dent_app_frontend. Obowiązuje zarówno programistów jak i agentów AI.

---

## Gałęzie (branches)

### Główne gałęzie

| Gałąź  | Cel                                           |
| ------ | --------------------------------------------- |
| `main` | Produkcja — tylko stabilny, przetestowany kod |
| `dev`  | Integracja — wszystkie PR trafiają tutaj      |

**Nowe branche zawsze tworzone od `dev`**, nie od `main`.

### Nazewnictwo branchy

```
<typ>/<nazwa-funkcjonalności>
```

| Typ         | Kiedy używać                     | Przykład                      |
| ----------- | -------------------------------- | ----------------------------- |
| `feature/`  | Nowa funkcjonalność              | `feature/patient-statistics`  |
| `fix/`      | Naprawa błędu                    | `fix/patient-form-validation` |
| `refactor/` | Refaktoryzacja bez nowej funkcji | `refactor/patient`            |
| `docs/`     | Tylko dokumentacja               | `docs/update-claude-md`       |
| `chore/`    | Zmiany konfiguracji, zależności  | `chore/update-dependencies`   |

**Zasady:**

- Tylko małe litery i myślniki, bez spacji ani podkreśleń
- Nazwa powinna wskazywać co zmienia, nie kto zmienia
- Krótka i konkretna: `feature/receipt-table` nie `feature/dodanie-nowej-tabeli-do-recepty`

---

## Commity

### Format (Conventional Commits)

```
<typ>: <krótki opis w języku angielskim>
```

Opis po dwukropku — małą literą, bez kropki na końcu, po angielsku.

| Typ        | Kiedy używać                                          |
| ---------- | ----------------------------------------------------- |
| `feat`     | Nowa funkcjonalność widoczna dla użytkownika          |
| `fix`      | Naprawa błędu                                         |
| `refactor` | Zmiana struktury kodu bez zmiany zachowania           |
| `docs`     | Zmiany w dokumentacji (CLAUDE.md, GITFLOW.md, README) |
| `chore`    | Konfiguracja, narzędzia, zależności                   |
| `style`    | Formatowanie, brak zmian logiki                       |
| `test`     | Dodawanie lub zmiana testów                           |

### Przykłady

```
feat: Added patient statistics endpoint
fix: Fixed receipt form select options
refactor: Extracted patient CRUD to composable
docs: Update CLAUDE.md with complete architecture
chore: Updated @tanstack/vue-table to v8
feat: Added new columns to appointments table
fix: Deleted unused file in patient module
```

### Zasady

- Jeden commit = jedna logiczna zmiana. Nie pakuj 5 niezwiązanych poprawek w jeden commit.
- Opis opisuje **co** robi commit, nie **jak** to robi.
- Nie commituj bez pytania użytkownika.
- Nie commituj plików `.env`, sekretów, dużych binarek.

---

## Pull Requesty

### Kiedy tworzyć PR

PR tworzymy gdy praca na branchu jest skończona i gotowa do przeglądu. Zawsze do `dev`, nigdy bezpośrednio do `main`.

### Tytuł PR

Taki sam format co commit — krótki, po angielsku, Conventional Commits:

```
feat: Patient statistics tab with chart widgets
fix: Receipt form select not loading options
refactor: Patient module — composables and components cleanup
```

### Opis PR — obowiązkowa struktura

```markdown
## Co zostało zmienione

- Krótki punktor opisujący każdą istotną zmianę
- Skup się na TYM CO zostało zrobione, nie na szczegółach implementacji
- Jeśli zmiana dotyczy konkretnego komponentu/pliku — wskaż go

## Dlaczego

Wyjaśnij kontekst i powód zmian:

- Jaki problem rozwiązuje?
- Czego wymagał użytkownik / jakie było zgłoszenie?
- Jeśli refaktoryzacja — co było nie tak z poprzednim podejściem?

## Jak testować

Konkretne kroki do weryfikacji zmian przez reviewera:

- [ ] Wejdź na `/patients` — tabela ładuje się poprawnie
- [ ] Kliknij w pacjenta — otwiera się profil z zakładką Statystyki
- [ ] Dodaj pacjenta przez dialog — pojawia się toast sukcesu i lista się odświeża
- [ ] Sprawdź tryb ciemny — layout nie jest zepsuty

## Zrzuty ekranu (opcjonalnie)

Dołącz screenshoty dla zmian wizualnych (UI, nowe komponenty, poprawki layoutu).
```

### Przykładowy opis PR

```markdown
## Co zostało zmienione

- Dodana zakładka "Statystyki" w profilu pacjenta (`PatientStatisticsWidget`)
- Nowy endpoint `PatientsEndpoints.STATISTICS(uuid)` i klucz cache `patientStatisticsKey`
- Typ `PatientStatistics` w `app/types/patient-statistics/`
- Usunięte nieużywane kolumny z tabeli wizyt

## Dlaczego

Użytkownik potrzebuje podglądu statystyk (liczba wizyt, ostatnia wizyta, brak wizyt) bezpośrednio
w profilu pacjenta bez wchodzenia w osobny moduł statystyk.

## Jak testować

- [ ] Wejdź na `/patients/:id` — widoczna zakładka "Statystyki"
- [ ] Statystyki ładują się z API (sprawdź Network tab)
- [ ] Przy braku danych wyświetla się pusty stan, nie błąd
- [ ] Edycja pacjenta nadal działa po dodaniu zakładki
```

---

## Issues (GitHub Issues)

### Kiedy tworzyć issue

- Znaleziony błąd który nie jest natychmiast naprawiany
- Nowa funkcjonalność do zaplanowania
- Dług techniczny wymagający większej pracy
- Pytanie / decyzja architektoniczna

### Format tytułu issue

```
[BUG] Krótki opis błędu
[FEAT] Krótki opis funkcjonalności
[REFACTOR] Krótki opis
[DOCS] Krótki opis
```

### Opis issue — struktura

**Dla błędów (`[BUG]`):**

```markdown
## Opis błędu

Co się dzieje a co powinno się dziać.

## Kroki do odtworzenia

1. Wejdź na...
2. Kliknij...
3. Zaobserwuj...

## Oczekiwane zachowanie

Co powinno się stać.

## Środowisko

- Branch:
- Przeglądarka:
```

**Dla funkcjonalności (`[FEAT]`):**

```markdown
## Cel

Co chcemy osiągnąć i dlaczego.

## Propozycja rozwiązania

Jak to może działać (opcjonalnie).

## Kryteria akceptacji

- [ ] Co musi działać żeby uznać zadanie za skończone
- [ ] ...
```

---

## Workflow krok po kroku

```
1. Utwórz branch od dev
   git checkout dev && git pull
   git checkout -b feature/nazwa-funkcjonalnosci

2. Pracuj, commituj regularnie
   git add <pliki>
   git commit -m "feat: Added patient export button"

3. Przed PR — synchronizuj z dev
   git fetch origin
   git rebase origin/dev

4. Utwórz PR do dev z pełnym opisem (szablon powyżej)

5. Po review i merge — usuń branch lokalnie i zdalnie
```

---

## Zasady dla agentów AI

- **Nigdy nie commituj bez pytania użytkownika** — zaproponuj commit message i poczekaj na akceptację
- **Nigdy nie pushuj bez pytania** — to samo
- **Nigdy nie twórz PR bez pytania** — zapytaj o tytuł i opis jeśli użytkownik nie podał
- **Nigdy nie merguj** bezpośrednio — PR zawsze przechodzi review
- Gdy tworzysz commit message — sprawdź `git diff --staged` żeby opisać **faktyczne** zmiany, nie domniemane
- Gdy tworzysz opis PR — bazuj na `git log dev..HEAD` żeby uwzględnić wszystkie commity od rozgałęzienia
