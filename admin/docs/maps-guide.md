# Руководство по картам / Maps Guide

[English below](#english)

## Русский

### Как работают карты в КАМРАД

КАМРАД использует оффлайн-карты на базе [OpenStreetMap](https://www.openstreetmap.org/) в формате [PMTiles](https://protomaps.com/). Карты хранятся локально и не требуют интернета после скачивания.

### Способы добавления карт

#### 1. Подобранные регионы (Curated)

В разделе **Настройки → Менеджер карт → Подобранные регионы** доступны:
- 🇺🇸 Все 50 штатов США
- 🇩🇪 Все 16 земель Германии
- 🇦🇹 Австрия, 🇨🇭 Швейцария
- 🌍 Глобальная обзорная мини-карта

Нажмите на регион → подтвердите → карта скачается автоматически.

#### 2. Извлечение региона мира (Extract)

В разделе **Настройки → Менеджер карт → Извлечь регион мира** доступны 52 региона:

| Категория | Регионы |
|-----------|---------|
| 🇷🇺 Россия | 9 федеральных округов + Москва + Санкт-Петербург |
| 🇰🇿🇺🇦🇧🇾 СНГ | Казахстан, Украина, Беларусь, Грузия, Армения, Азербайджан, Узбекистан, Кыргызстан, Таджикистан |
| 🇪🇺 Европа | Франция, Великобритания, Италия, Испания, Нидерланды, Польша, Чехия, скандинавские страны и др. |
| 🌏 Азия | Китай, Япония, Южная Корея, Индия, Турция, Таиланд, Вьетнам, Индонезия |
| 🌎 Америка | Канада, Бразилия, Мексика, Аргентина |
| 🌍 Африка и Океания | Египет, ЮАР, Нигерия, Кения, Австралия, Новая Зеландия |

**Как это работает:** КАМРАД использует утилиту `pmtiles extract` для загрузки только нужных тайлов из планетарного файла ProtoMaps (~120 ГБ) через HTTP Range requests. Скачивается только ваш регион, а не вся планета.

**Время скачивания** зависит от размера региона и скорости интернета. Примеры:
- Москва и область: ~800 МБ, ~5-15 минут
- Вся Россия (все округа): ~10 ГБ, ~30-60 минут

#### 3. Загрузка по URL

Кнопка **Скачать пользовательский файл карты** позволяет загрузить любой `.pmtiles` файл по прямой ссылке.

### Базовые ресурсы карт

При первом использовании карт КАМРАД автоматически скачает базовые ресурсы (шрифты и стили, ~9 МБ). Без них карты не отображаются.

### Управление картами

- **Просмотр**: Главная → Карты
- **Управление файлами**: Настройки → Менеджер карт → Сохранённые файлы
- **Удаление**: выберите файл → Удалить

---

<a id="english"></a>
## English

### How Maps Work in KAMRAD

KAMRAD uses offline maps based on [OpenStreetMap](https://www.openstreetmap.org/) in [PMTiles](https://protomaps.com/) format. Maps are stored locally and don't require internet after download.

### Ways to Add Maps

#### 1. Curated Regions
Pre-packaged regions available in **Settings → Maps Manager → Curated Map Regions**: USA (50 states), Germany (16 states), Austria, Switzerland, Global overview.

#### 2. Extract World Region
52 regions available in **Settings → Maps Manager → Extract World Region**. Uses `pmtiles extract` with HTTP Range requests — downloads only the tiles you need, not the entire planet file.

#### 3. Custom URL Download
Download any `.pmtiles` file via direct URL using the **Download a Custom Map File** button.

### Base Map Assets
KAMRAD automatically downloads base map assets (fonts and styles, ~9 MB) on first use. Maps won't render without them.
