# Changelog / Журнал изменений

## [0.3.0] - 2026-04-17

### RU — Синхронизация с Project N.O.M.A.D. v1.31.0 + улучшения UX

Портированы 14 релевантных коммитов из upstream Crosstalk-Solutions/project-nomad v1.31.0 без merge — сохранены kamrad-брендинг, русская локализация и install-скрипты.

#### Новое
- **Карты: шкала расстояния** — внизу карты показывается текущий масштаб
- **Карты: метки локаций** — клик по карте → пин с выбором цвета (6 цветов) и названием. Панель «Сохранённые места» с fly-to навигацией
- **Карты: переключатель км/мили** — сохраняется в `localStorage`
- **Библиотека знаний: zero-downtime обновление** — Kiwix работает в library mode с `--monitorLibrary`. При скачивании нового ZIM (Википедия, медицина, выживание и т.д.) Библиотека не выключается, контент появляется сразу
- **Автомиграция legacy-установок Kiwix** — существующие kamrad-установки автоматически перейдут на library mode при первом рестарте сервиса
- **AI Settings: тумблер облачных фич Ollama** — по умолчанию выключен (прокидывает `OLLAMA_NO_CLOUD=1`). KAMRAD остаётся offline-first
- **AI Settings: тумблер Flash Attention** — по умолчанию включён, оптимизация памяти для длинных контекстов
- **AI Settings: секция «Установленные модели»** — список установленных AI-моделей с размером и кнопкой удаления
- **KnowledgeBase: загрузка до 5 файлов по 100MB** (было 1 файл до 10MB). Массовая загрузка с агрегированными уведомлениями

#### Изменено
- **Навигация:** переход между страницами через `Link`/`router.visit` вместо `window.location.href` — нет полной перезагрузки, быстрее
- **Производительность:** gzip-сжатие на всех API-маршрутах (можно отключить через `DISABLE_COMPRESSION=true`)
- **Производительность:** Docker list запросы кэшируются 5 секунд, aiAssistantName — 60 секунд, DB connection pool настроен (2-15 соединений, 10 сек таймаут)
- **Бандл:** `@tabler/icons-react` больше не импортируется целиком — только используемые иконки через `lib/icons.ts`
- **Карты:** корректный парсинг хостов (полный URL, host:port, голое имя) в `getPublicFileBaseUrl`

#### Инфраструктура
- Миграция фреймворка **Frai → TAUSIK** (Kibertum/tausik-core v1.1.1 как git submodule)
- Новые DB-миграции: `map_markers`, `migrate_kiwix_to_library_mode`
- API endpoints: `GET/POST /api/maps/markers`, `PATCH/DELETE /api/maps/markers/:id`
- Зависимости подняты: `@types/dockerode` 3→4, `fast-xml-parser` 5.5.7, `pmtiles` 4.4.0, `tailwindcss` 4.2.1, `yaml` 2.8.3, добавлен `compression`

#### Отложено
- Downloads cancel для больших файлов (d7e3d92) — требует upstream `bac53e2` (большой рефакторинг `run_download_job.ts`)
- Release notes, FAQ, CONTRIBUTING из upstream
- Все изменения `install/*` — сохраняется наш `install_kamrad.sh`

---

### EN — Sync with Project N.O.M.A.D. v1.31.0 + UX improvements

Ported 14 relevant commits from upstream Crosstalk-Solutions/project-nomad v1.31.0 without merge — preserved kamrad branding, Russian localization, and install scripts.

#### Added
- **Maps: distance scale bar** — current map scale shown at bottom
- **Maps: location markers** — click to drop a pin with color picker (6 colors) and name. "Saved Locations" panel with fly-to navigation
- **Maps: km/miles toggle** — persists in `localStorage`
- **Knowledge Library: zero-downtime updates** — Kiwix runs in library mode with `--monitorLibrary`. New ZIM downloads appear instantly without restarting the container
- **Auto-migration of legacy Kiwix installs** — existing kamrad deployments upgrade to library mode on first Kiwix restart
- **AI Settings: Ollama Cloud toggle** — off by default (`OLLAMA_NO_CLOUD=1`). KAMRAD stays offline-first
- **AI Settings: Flash Attention toggle** — on by default, memory optimization for long contexts
- **AI Settings: "Installed Models" section** — table of installed AI models with disk size and delete action
- **KnowledgeBase: 5 files up to 100MB per upload** (was 1 file × 10MB). Bulk upload with aggregated notifications

#### Changed
- **Navigation:** `Link`/`router.visit` instead of `window.location.href` — no full page reloads
- **Performance:** gzip compression on all API routes (can be disabled via `DISABLE_COMPRESSION=true`)
- **Performance:** Docker list cached for 5s, aiAssistantName for 60s, DB pool tuned (2-15 conns, 10s timeout)
- **Bundle:** `@tabler/icons-react` manual import-map via `lib/icons.ts` — smaller bundle
- **Maps:** robust hostname parsing (full URL, host:port, bare hostname)

#### Infrastructure
- Migrated **Frai → TAUSIK** framework (Kibertum/tausik-core v1.1.1 as git submodule)
- New DB migrations: `map_markers`, `migrate_kiwix_to_library_mode`
- API endpoints: `GET/POST /api/maps/markers`, `PATCH/DELETE /api/maps/markers/:id`
- Dependencies bumped: `@types/dockerode` 3→4, `fast-xml-parser` 5.5.7, `pmtiles` 4.4.0, `tailwindcss` 4.2.1, `yaml` 2.8.3, added `compression`

#### Deferred
- Large file download cancellation (d7e3d92) — depends on upstream `bac53e2` (major `run_download_job.ts` refactor)
- Upstream release notes, FAQ, CONTRIBUTING
- All `install/*` changes — kept our `install_kamrad.sh`

---

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
