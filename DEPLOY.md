# Как выложить сайт на GitHub (пошагово)

Сайт уже собран в этой папке. Осталось создать репозиторий и включить GitHub Pages.

## Шаг 1 — аккаунт GitHub

Если аккаунта нет: https://github.com/signup

## Шаг 2 — новый репозиторий

1. Откройте https://github.com/new
2. **Repository name:** `human-proteome-atlas` (или любое имя)
3. **Public**
4. Не добавляйте README / .gitignore (файлы уже есть локально)
5. Нажмите **Create repository**

## Шаг 3 — загрузка файлов

В PowerShell:

```powershell
cd "C:\Users\Arina1996\Desktop\лаб иеб\human-proteome-atlas"
git remote add origin https://github.com/arinaatom-cyber/human-proteome-atlas.git
git push -u origin main
```

(Если `remote origin` уже есть: `git remote set-url origin https://github.com/arinaatom-cyber/human-proteome-atlas.git`)

При первом push GitHub попросит войти (браузер или токен).

## Шаг 4 — включить GitHub Pages

1. Репозиторий → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` → папка **`/ (root)`**
4. **Save**

Через 1–3 минуты сайт откроется по адресу:

`https://arinaatom-cyber.github.io/human-proteome-atlas/`

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
