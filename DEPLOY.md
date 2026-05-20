# Как выложить сайт на GitHub (пошагово)

Сайт уже собран в этой папке. Осталось создать репозиторий и включить GitHub Pages.

## Шаг 1 — аккаунт GitHub

Если аккаунта нет: https://github.com/signup

## Шаг 2 — новый репозиторий

1. Откройте https://github.com/new
2. **Repository name:** `TMT` (у вас уже создан: https://github.com/arinaatom-cyber/TMT)
3. **Public**
4. Не добавляйте README / .gitignore (файлы уже есть локально)
5. Нажмите **Create repository**

## Шаг 3 — загрузка файлов

В PowerShell:

```powershell
cd "C:\Users\Arina1996\Desktop\лаб иеб\human-proteome-atlas"
git remote set-url origin https://github.com/arinaatom-cyber/TMT.git
git push -u origin main
```

При первом push GitHub попросит войти (браузер или токен).

## Шаг 4 — включить GitHub Pages (обязательно!)

Без этого шага будет **404 — There isn't a GitHub Pages site here**.

1. Откройте https://github.com/arinaatom-cyber/TMT/settings/pages
2. В блоке **Build and deployment** → **Source** выберите один вариант:

**Вариант A (проще):**
- Source: **Deploy from a branch**
- Branch: **main** → **/ (root)**
- **Save**

**Вариант B (через Actions, уже добавлен workflow):**
- Source: **GitHub Actions**
- Зайдите во вкладку **Actions** → дождитесь зелёной галочки у workflow «Deploy site to GitHub Pages»

3. Подождите 1–5 минут, обновите страницу в Settings → Pages — появится зелёная ссылка на сайт.

Адрес сайта:

`https://arinaatom-cyber.github.io/TMT/`

Эту ссылку можно отправлять коллегам.

## Шаг 5 — Google Таблица (важно!)

Сайт подключён к вашей таблице:

https://docs.google.com/spreadsheets/d/1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38/edit?gid=1072380314

**Настройки таблицы → Доступ → «Все, у кого есть ссылка» → Просматриватель**

Используются колонки: `Project ID`, `Organ`, `Tissue`, `Tumor Type`, `Sample Type`, `Database`, `URL`, `TMT Label (Unified)`, `Platform MS (Unified)` и др.

Новые строки (PRIDE, PDC, GTEx…) появятся на карте после обновления страницы — код менять не нужно.

ID в `app.js`: `SHEET` и `GID=1072380314`.

## Обновление после новых проектов

Добавили строки в Google Sheet → обновите страницу в браузере.  
Меняли код сайта → `git add .` → `git commit -m "update"` → `git push`.
