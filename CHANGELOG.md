# Changelog / Журнал изменений

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
