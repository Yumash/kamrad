# Installing KAMRAD

**English** | [Русский](INSTALL.md)

## Requirements

- OS: Ubuntu 22.04 / 24.04 (or any Debian-based distribution)
- Privileges: sudo/root
- Internet: required only during installation
- Docker: will be installed automatically if missing

## Quick Install (one command)

```bash
sudo apt-get update && sudo apt-get install -y curl && \
curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/install_kamrad.sh -o install_kamrad.sh && \
sudo bash install_kamrad.sh
```

After completion, open your browser: `http://localhost:8080`

If installing on a server, use the IP address: `http://SERVER_IP:8080`

## Step-by-Step Installation (Advanced)

### 1. Install Docker

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
```

### 1.1 (Optional) GPU: NVIDIA Container Toolkit

If you have an NVIDIA GPU and want to use it for AI models:

```bash
# Add NVIDIA repository
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Install
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit

# Configure Docker runtime
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker

# Verify
docker run --rm --gpus all nvidia/cuda:12.0.0-base-ubuntu22.04 nvidia-smi
```

### 1.2 (Optional) Host-level Ollama

If Ollama is already installed on the host (not in Docker), KAMRAD can use it directly. This is recommended if you already have GPU + models configured.

**Verify Ollama is running:**
```bash
curl http://localhost:11434/api/tags
```

**During KAMRAD setup** — skip Ollama installation in the UI (Settings → Apps). KAMRAD will automatically connect to the host Ollama via `host.docker.internal:11434`. Your models and GPU configuration are preserved.

The `docker-compose.yml` already includes the required `extra_hosts` setting:
```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

### 2. Create directory

```bash
sudo mkdir -p /opt/kamrad
cd /opt/kamrad
```

### 3. Download compose file

```bash
sudo curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/management_compose.yaml -o docker-compose.yml
```

### 4. Configure variables

Open `docker-compose.yml` and replace all `replaceme` values:

```bash
sudo nano docker-compose.yml
```

Must replace:
- `APP_KEY` — random string, minimum 16 characters
- `URL` — access URL (e.g., `http://192.168.1.100:8080`)
- `DB_PASSWORD` and `MYSQL_PASSWORD` — same database password
- `MYSQL_ROOT_PASSWORD` — MySQL root password

### 5. Start

```bash
sudo docker compose up -d
```

### 6. Verify

```bash
sudo docker compose ps
```

All containers should be `running` or `healthy`.

## Management

```bash
# Stop all services
cd /opt/kamrad && sudo docker compose down

# Start
cd /opt/kamrad && sudo docker compose up -d

# View logs
cd /opt/kamrad && sudo docker compose logs -f admin

# Update
cd /opt/kamrad && sudo docker compose pull && sudo docker compose up -d
```
