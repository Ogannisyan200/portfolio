Портфолио: Оганнисян Рита
Vite + React + TypeScript. Тёмный стиль, 8 кейсов, страница с вариантами монограммы.
Запуск
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # сборка в папку dist
```
Где что менять
Что	Где
Тексты кейсов, порядок проектов, подписи к экранам	`src/data/projects.ts`
Картинки	`public/img/<проект>/...` (webp). После замены обнови размеры в `src/data/imgmeta.json`
Имя, Telegram, файл резюме, выбор монограммы	`src/config.ts`
Тексты главной («Обо мне», «Как я работаю»)	`src/pages/Home.tsx`
Цвета, шрифты, отступы	`src/styles.css`, блок `:root`
Резюме	`public/resume.pdf`
Варианты монограммы: откройте сайт и добавьте `#/logo` к адресу. Нужный вариант (`ligature`, `ring` или `orbit`) впишите в `LOGO_VARIANT` в `src/config.ts`.
Публикация бесплатно: GitHub + Vercel
GitHub. Создай новый репозиторий на github.com (кнопка New, имя например `portfolio`, без README). В терминале VS Code в папке проекта:
```bash
   git init
   git add .
   git commit -m "Портфолио"
   git branch -M main
   git remote add origin https://github.com/ТВОЙ_ЛОГИН/portfolio.git
   git push -u origin main
   ```
Папки `node_modules` и `dist` в репозиторий не попадут, они в `.gitignore`.
Vercel. Зайди на vercel.com, войди через GitHub, нажми Add New → Project, выбери репозиторий `portfolio`. Настройки подтянутся сами (Framework: Vite, Build: `npm run build`, Output: `dist`). Нажми Deploy.
Через минуту сайт откроется по адресу вида `portfolio-xxxx.vercel.app`. Имя можно поменять в Settings → Domains. Каждый новый `git push` обновляет сайт автоматически.
Альтернатива: GitHub Pages. Подойдёт та же сборка, `npm run build` и публикация содержимого `dist`. Адреса страниц вида `/#/work/lumen`, поэтому дополнительных настроек для маршрутов не нужно.