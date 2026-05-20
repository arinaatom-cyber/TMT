# Human Proteome Atlas

Интерактивная карта органов и TMT-протеомных проектов. Данные подгружаются из Google Sheets.

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub (например `human-proteome-atlas`).
2. Загрузите содержимое этой папки в репозиторий.
3. В репозитории: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
4. Branch: `main`, folder: `/ (root)`.
5. Сайт будет доступен по адресу:  
   `https://ВАШ_ЛОГИН.github.io/human-proteome-atlas/`

## Google Sheets

Таблица должна быть доступна **«всем, у кого есть ссылка»** (просмотр), иначе CSV не загрузится в браузере.

Текущий ID таблицы задан в `app.js` (`SHEET`).

## Локальный просмотр

Откройте `index.html` в браузере или запустите простой сервер:

```bash
python -m http.server 8080
```

Затем откройте http://localhost:8080
