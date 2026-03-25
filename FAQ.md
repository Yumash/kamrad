# Часто задаваемые вопросы (FAQ)

[English below](#english)

## Русский

### Можно ли изменить порты КАМРАД?

Да, порты основных сервисов (Командный Центр, MySQL, Redis) настраиваются в `docker-compose.yml`. См. [INSTALL.md](INSTALL.md) для подробностей.

### Можно ли изменить путь хранения данных?

Да, измените bind mounts в `docker-compose.yml`, указав нужную директорию на хост-машине.

### Можно ли запустить КАМРАД на Mac, WSL2 или не-Debian дистрибутиве?

КАМРАД оптимизирован для Debian-based Linux (рекомендуется Ubuntu). Технически Docker-контейнеры могут работать на любой ОС с Docker, но установочные скрипты рассчитаны на Debian. На других платформах может потребоваться ручная настройка.

### Можно ли запустить на Raspberry Pi (ARM)?

В настоящее время КАМРАД собирается под x86-64. Поддержка ARM в планах.

### Какие требования к оборудованию?

КАМРАД сам по себе лёгкий. Требования зависят от устанавливаемых инструментов. См. [README.md](README.md#требования-к-оборудованию).

### Какие языки поддерживаются?

КАМРАД поддерживает 4 языка интерфейса: русский, английский, немецкий, казахский. Контент-коллекции (Википедия, образование) доступны для каждого языка отдельно. Добавить новый язык можно без изменения кода — см. [CONTRIBUTING.md](CONTRIBUTING.md#добавление-нового-языка).

### На каких технологиях построен КАМРАД?

- **Docker** — контейнеризация
- **Node.js + TypeScript** — бэкенд (AdonisJS)
- **React** — фронтенд (Vite + Inertia.js)
- **MySQL** — база данных
- **Redis** — кеширование и очереди задач
- **i18next** — мультиязычность

КАМРАД использует паттерн Docker-outside-of-Docker (DooD) для управления контейнерами через UI.

### Обязательно ли устанавливать AI?

Нет, AI-функции (Ollama, Qdrant, RAG) полностью опциональны.

### КАМРАД действительно бесплатный?

Да, КАМРАД — полностью бесплатный проект с открытым исходным кодом (Apache License 2.0). Никаких скрытых платежей или платных функций.

### Какая связь с Project N.O.M.A.D.?

КАМРАД — это форк [Project N.O.M.A.D.](https://github.com/Crosstalk-Solutions/project-nomad) от Crosstalk Solutions LLC. Мы добавили мультиязычность, ребрендинг и контент для русскоговорящих пользователей. Оригинальная лицензия Apache 2.0 сохранена.

---

<a id="english"></a>
## English

### Can I customize the ports?

Yes, modify `docker-compose.yml` to change port mappings. See [INSTALL.en.md](INSTALL.en.md).

### Can I run KAMRAD on Mac, WSL2, or non-Debian distros?

KAMRAD is optimized for Debian-based Linux (Ubuntu recommended). Docker containers may work on other platforms, but install scripts are Debian-specific.

### What languages are supported?

KAMRAD supports 4 UI languages: Russian, English, German, Kazakh. Content collections are available per language. Adding a new language requires no code changes.

### Is AI required?

No, AI features (Ollama, Qdrant, RAG) are completely optional.

### Is KAMRAD free?

Yes, fully free and open-source under Apache License 2.0.

### What's the relationship with Project N.O.M.A.D.?

KAMRAD is a fork of [Project N.O.M.A.D.](https://github.com/Crosstalk-Solutions/project-nomad) by Crosstalk Solutions LLC with added multilingual support and Russian-first focus. Original Apache 2.0 license preserved.
