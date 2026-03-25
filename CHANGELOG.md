# Changelog / Журнал изменений

## [0.2.0] - 2026-03-25

### RU — Локальный переводчик, карты Европы, расширенные коллекции

#### Новое
- **Локальный переводчик** — Translation Service с двумя провайдерами:
  - Ollama (по умолчанию) — качественный перевод через AI-модель
  - LibreTranslate (опция) — быстрый перевод, устанавливается как Docker-сервис
- **Страница переводчика** в Settings — вставьте текст, выберите язык, получите перевод
- **Кеш переводов** в SQLite — повторный перевод мгновенный
- **Автоопределение языка** — переводчик использует язык интерфейса пользователя
- **Карты Германии** — все 16 федеральных земель (из whitespring/project-nomad-maps-europe)
- **Карты Австрии и Швейцарии**
- **Глобальная обзорная мини-карта** (~60 МБ)
- **Stack Overflow EN** (95 ГБ) и **Stack Overflow RU** (2.1 ГБ) в коллекциях
- **Base-assets карт** теперь в репо КАМРАД (не зависят от внешнего репо)

#### Изменено
- Имена Docker-контейнеров: `nomad_*` → `kamrad_*`
- Переменная окружения: `KAMRAD_STORAGE_PATH` (по умолчанию `/opt/kamrad/storage`)
- Quality gates: tsc (block) + eslint (warn) для TypeScript

#### Инфраструктура
- LibreTranslate как устанавливаемый сервис (порт 5050)
- Миграция `translation_cache` для кеша переводов
- API endpoint `POST /api/translate`

---

### EN — Local Translator, European Maps, Extended Collections

#### Added
- **Local Translator** — Translation Service with two providers:
  - Ollama (default) — high-quality AI-powered translation
  - LibreTranslate (optional) — fast translation, installed as Docker service
- **Translator page** in Settings — paste text, choose language, get translation
- **Translation cache** in SQLite — instant repeated translations
- **Auto language detection** — translator uses user's UI language
- **Germany maps** — all 16 federal states (from whitespring/project-nomad-maps-europe)
- **Austria and Switzerland maps**
- **Global overview mini-map** (~60 MB)
- **Stack Overflow EN** (95 GB) and **Stack Overflow RU** (2.1 GB) in collections
- **Map base-assets** now stored in KAMRAD repo (no external dependency)

#### Changed
- Docker container names: `nomad_*` → `kamrad_*`
- Environment variable: `KAMRAD_STORAGE_PATH` (default `/opt/kamrad/storage`)
- Quality gates: tsc (block) + eslint (warn) for TypeScript

---

## [0.1.1] - 2026-03-25

### RU — Исправления безопасности и качества

#### Безопасность
- Удалены все вызовы к `projectnomad.us` (бенчмарк, рассылка, API моделей)
- Удалён захардкоженный HMAC-секрет из benchmark_service
- Исправлена prompt injection через preferredLanguage (валидация по whitelist)
- Отключена отправка бенчмарков на внешний сервер (только локальные результаты)
- Отключена подписка на рассылку (ссылка на GitHub Releases)

#### Исправлено
- Вычищены все упоминания N.O.M.A.D. из UI (кроме attribution в Legal)
- Обновлены ссылки на GitHub (support, debug, benchmark)
- Синхронизация языка между сервером и клиентом (Inertia → i18n)
- `console.log` заменены на `logger.debug`
- localStorage ключи переименованы в `kamrad:*`
- system.tsx использует aiAssistantName вместо хардкода

#### i18n
- Переведены Easy Setup (~50 строк) и Chat компоненты (~45 строк)
- Убраны все inline fallback строки из t() вызовов (97 штук)
- Добавлено ~136 новых ключей в en.json и ru.json
- 100% покрытие i18n для всех React-компонентов

#### Инфраструктура
- Все install/start/stop/update скрипты обновлены под КАМРАД
- Sidecar скрипты (disk-collector, updater) обновлены

---

### EN — Security and Quality Fixes

#### Security
- Removed all calls to `projectnomad.us` (benchmark, newsletter, models API)
- Removed hardcoded HMAC secret from benchmark_service
- Fixed prompt injection via preferredLanguage (whitelist validation)
- Disabled benchmark submission to external server (local-only results)
- Disabled newsletter subscription (link to GitHub Releases instead)

#### Fixed
- Cleaned all N.O.M.A.D. references from UI (except attribution in Legal)
- Updated GitHub links (support, debug, benchmark)
- Synced locale between server and client (Inertia → i18n)
- Replaced console.log with logger.debug
- Renamed localStorage keys to kamrad:*
- system.tsx uses aiAssistantName instead of hardcoded string

#### i18n
- Translated Easy Setup (~50 strings) and Chat components (~45 strings)
- Removed all inline fallback strings from t() calls (97 total)
- Added ~136 new keys to en.json and ru.json
- 100% i18n coverage for all React components

#### Infrastructure
- All install/start/stop/update scripts rebranded for КАМРАД
- Sidecar scripts (disk-collector, updater) updated

---

## [0.1.0] - 2026-03-25

### RU — Первый релиз КАМРАД

Форк Project N.O.M.A.D. с полным ребрендингом и мультиязычностью.

#### Добавлено
- Мультиязычный интерфейс (русский, английский, немецкий, казахский)
- Система i18n на базе react-i18next с переключением языков в Footer
- Модульная система контент-коллекций по языкам (`collections/{lang}/`)
- Русские коллекции: Википедия, медицинские справочники, Викисловарь, Викицитатник
- Казахская и немецкая Википедия
- Мультиязычная модель Qwen2.5 как рекомендуемая по умолчанию
- Настройка предпочтительного языка ответов AI
- Мультиязычная документация (README на 4 языках)
- Пошаговые инструкции по установке (INSTALL.md)

#### Изменено
- Полный ребрендинг: Project N.O.M.A.D. → КАМРАД
- Новый логотип в стиле военного шеврона
- Все GitHub URLs обновлены на github.com/Yumash/kamrad
- Docker: контейнеры переименованы (kamrad_admin, kamrad_mysql и т.д.)
- Путь установки: /opt/kamrad
- HTML title: КАМРАД

---

### EN — First KAMRAD Release

Fork of Project N.O.M.A.D. with full rebranding and multilingual support.

#### Added
- Multilingual UI (Russian, English, German, Kazakh)
- i18n system based on react-i18next with language switcher in Footer
- Modular content collection system by language (`collections/{lang}/`)
- Russian collections: Wikipedia, medical references, Wiktionary, Wikiquote
- Kazakh and German Wikipedia
- Multilingual Qwen2.5 model as default recommendation
- Preferred AI response language setting
- Multilingual documentation (README in 4 languages)
- Step-by-step installation guide (INSTALL.md)

#### Changed
- Full rebrand: Project N.O.M.A.D. → KAMRAD
- New military chevron-style logo
- All GitHub URLs updated to github.com/Yumash/kamrad
- Docker: containers renamed (kamrad_admin, kamrad_mysql, etc.)
- Installation path: /opt/kamrad
- HTML title: КАМРАД
