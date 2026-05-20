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

В PowerShell (замените `ВАШ_ЛОГИН` на свой GitHub-логин):

```powershell
cd "C:\Users\Arina1996\Desktop\лаб иеб\human-proteome-atlas"
git remote add origin https://github.com/ВАШ_ЛОГИН/human-proteome-atlas.git
git push -u origin main
```

При первом push GitHub попросит войти (браузер или токен).

## Шаг 4 — включить GitHub Pages

1. Репозиторий → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` → папка **`/ (root)`**
4. **Save**

Через 1–3 минуты сайт откроется по адресу:

`https://ВАШ_ЛОГИН.github.io/human-proteome-atlas/`

Эту ссылку можно отправлять коллегам.

## Шаг 5 — Google Таблица (важно!)

Сайт читает CSV из Google Sheets. Таблица должна быть открыта на просмотр:

**Настройки таблицы → Доступ → «Все, у кто есть ссылка» → Просматриватель**

ID таблицы в `app.js` (строка `SHEET`). При смене таблицы измените ID и сделайте `git push` — сайт обновится сам.

## Обновление после новых проектов

Добавили строки в Google Sheet → обновите страницу в браузере.  
Меняли код сайта → `git add .` → `git commit -m "update"` → `git push`.
