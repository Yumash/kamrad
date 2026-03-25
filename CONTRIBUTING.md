# Участие в проекте / Contributing

[English below](#english)

## Русский

Спасибо за интерес к КАМРАД! Мы приветствуем вклад любого масштаба.

### Как помочь

1. **Сообщения об ошибках** — откройте [Issue](https://github.com/Yumash/kamrad/issues) с описанием проблемы
2. **Предложения функций** — создайте Issue с тегом `enhancement`
3. **Pull Requests** — форкните репо, создайте ветку, отправьте PR
4. **Переводы** — помогите перевести интерфейс на новые языки (см. `admin/inertia/locales/`)
5. **Контент-коллекции** — добавьте ZIM-файлы или образовательные ресурсы для вашего языка (см. `collections/`)

### Правила

- Пишите понятные сообщения коммитов
- Добавляйте тесты для новой функциональности
- Следуйте существующему стилю кода
- Обновляйте CHANGELOG.md при значимых изменениях

### Добавление нового языка

1. Создайте файл перевода: `admin/inertia/locales/{код_языка}.json`
2. Добавьте язык в `admin/inertia/lib/i18n.ts`
3. Создайте контент-коллекции: `collections/{код_языка}/wikipedia.json`
4. Обновите `collections/manifest.json`

---

<a id="english"></a>
## English

Thank you for your interest in KAMRAD! We welcome contributions of any size.

### How to Help

1. **Bug reports** — open an [Issue](https://github.com/Yumash/kamrad/issues) describing the problem
2. **Feature requests** — create an Issue with the `enhancement` tag
3. **Pull Requests** — fork the repo, create a branch, submit a PR
4. **Translations** — help translate the interface to new languages (see `admin/inertia/locales/`)
5. **Content collections** — add ZIM files or educational resources for your language (see `collections/`)

### Guidelines

- Write clear commit messages
- Add tests for new functionality
- Follow existing code style
- Update CHANGELOG.md for significant changes
