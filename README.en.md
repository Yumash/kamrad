<div align="center">
<img src="image.jpg" width="200" height="200"/>

# Project KAMRAD.
### Node for Autonomous Media, Archives, and Data

**Knowledge That Never Goes Offline**

[![GitHub](https://img.shields.io/badge/GitHub-Yumash%2Fkamrad-blue)](https://github.com/Yumash/kamrad)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

🌐 **English** | [Русский](README.md) | [Deutsch](README.de.md) | [Қазақша](README.kz.md)

</div>

---

Project KAMRAD is a self-contained, offline-first knowledge and education server with built-in AI chat, libraries, maps, and tools — all in one place, no internet required.

## Features

| Feature | Powered By | What You Get |
|---------|-----------|-------------|
| Knowledge Library | Kiwix | Offline Wikipedia, medical references, guides, ebooks |
| AI Assistant | Ollama + Qdrant | Local chat with document upload and semantic search |
| Education | Kolibri | Khan Academy courses, progress tracking |
| Offline Maps | ProtoMaps | Downloadable regional maps with search and navigation |
| Data Tools | CyberChef | Encryption, encoding, hashing, and data analysis |
| Notes | FlatNotes | Local note-taking with Markdown support |
| Benchmark | Built-in | Hardware performance scoring |

## Quick Install

*Requires: Debian-based OS (Ubuntu recommended). sudo/root privileges required.*

```bash
sudo apt-get update && sudo apt-get install -y curl && curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/install_kamrad.sh -o install_kamrad.sh && sudo bash install_kamrad.sh
```

After installation, open your browser: `http://localhost:8080` (or `http://DEVICE_IP:8080`)

## Hardware Requirements

#### Minimum
- CPU: 2 GHz dual-core
- RAM: 4 GB
- Storage: 5 GB free
- OS: Debian-based (Ubuntu recommended)

#### Optimal (for AI)
- CPU: AMD Ryzen 7 / Intel Core i7
- RAM: 32 GB
- GPU: NVIDIA RTX 3060 or equivalent (more VRAM = larger models)
- Storage: 250 GB SSD

## Multilingual

KAMRAD supports multiple UI and content languages:
- 🇷🇺 Русский (primary)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇰🇿 Қазақша

Content collections (Wikipedia, education) are available per language. Maps are global.

## Privacy

- **Zero telemetry** — no data collected or transmitted
- **Local-first** — everything stays on your device
- **No accounts** — works without registration
- **Internet optional** — only needed to download content

## License

Apache License 2.0 — see [LICENSE](LICENSE)

## Attribution

> Based on [Project N.O.M.A.D.](https://github.com/Crosstalk-Solutions/project-nomad) by Crosstalk Solutions LLC.
> Original project licensed under Apache License 2.0.

## Contributing

Pull requests and issues are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
