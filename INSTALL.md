# Установка КАМРАД

[English](INSTALL.en.md) | **Русский**

## Требования

- ОС: Ubuntu 22.04 / 24.04 (или любой Debian-based дистрибутив)
- Права: sudo/root
- Интернет: требуется только для установки
- Docker: будет установлен автоматически если отсутствует

## Быстрая установка (одна команда)

```bash
sudo apt-get update && sudo apt-get install -y curl && \
curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/install_kamrad.sh -o install_kamrad.sh && \
sudo bash install_kamrad.sh
```

После завершения откройте браузер: `http://localhost:8080`

Если устанавливаете на сервер — используйте IP-адрес: `http://IP_СЕРВЕРА:8080`

## Пошаговая установка (продвинутая)

### 1. Установите Docker

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Создайте директорию

```bash
sudo mkdir -p /opt/kamrad
cd /opt/kamrad
```

### 3. Скачайте compose-файл

```bash
sudo curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/management_compose.yaml -o docker-compose.yml
```

### 4. Настройте переменные

Откройте `docker-compose.yml` и замените все значения `replaceme`:

```bash
sudo nano docker-compose.yml
```

Обязательно замените:
- `APP_KEY` — случайная строка минимум 16 символов
- `URL` — адрес доступа (например `http://192.168.1.100:8080`)
- `DB_PASSWORD` и `MYSQL_PASSWORD` — одинаковый пароль БД
- `MYSQL_ROOT_PASSWORD` — пароль root MySQL

### 5. Запустите

```bash
sudo docker compose up -d
```

### 6. Проверьте

```bash
sudo docker compose ps
```

Все контейнеры должны быть в статусе `running` или `healthy`.

## Мастер настройки

При первом входе в веб-интерфейс вам будет предложен **Мастер настройки** — он поможет:
- Выбрать приложения для установки
- Скачать Википедию на нужном языке
- Настроить AI-ассистента
- Скачать карты вашего региона

## Управление

```bash
# Остановить все сервисы
cd /opt/kamrad && sudo docker compose down

# Запустить
cd /opt/kamrad && sudo docker compose up -d

# Просмотреть логи
cd /opt/kamrad && sudo docker compose logs -f admin

# Обновить
cd /opt/kamrad && sudo docker compose pull && sudo docker compose up -d
```

## Удаление

```bash
cd /opt/kamrad && sudo docker compose down -v
sudo rm -rf /opt/kamrad
```

**Внимание:** это удалит все данные, включая базу данных, загруженный контент и настройки.

## Решение проблем

### Контейнер не запускается
```bash
sudo docker compose logs admin
```
Проверьте что `APP_KEY` — минимум 16 символов, а `URL` указан правильно.

### Порт 8080 занят
Измените маппинг портов в `docker-compose.yml`:
```yaml
ports:
  - "9090:8080"  # Доступ через порт 9090
```

### Недостаточно памяти для AI
AI-модели требуют минимум 8 ГБ RAM. Для комфортной работы рекомендуется 32 ГБ и GPU.
