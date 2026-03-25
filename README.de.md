<div align="center">
<img src="image.jpg" width="200" height="200"/>

# Projekt KAMRAD.
### Knoten für Autonome Medien, Archive und Daten

**Wissen, das nie offline geht**

[![GitHub](https://img.shields.io/badge/GitHub-Yumash%2Fkamrad-blue)](https://github.com/Yumash/kamrad)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

🌐 [English](README.en.md) | [Русский](README.md) | **Deutsch** | [Қазақша](README.kz.md)

</div>

---

Projekt KAMRAD ist ein eigenständiger, offline-orientierter Wissens- und Bildungsserver mit integriertem AI-Chat, Bibliotheken, Karten und Werkzeugen — alles an einem Ort, kein Internet erforderlich.

## Funktionen

| Funktion | Basierend auf | Was Sie bekommen |
|----------|--------------|-----------------|
| Wissensbibliothek | Kiwix | Offline-Wikipedia, medizinische Referenzen, Anleitungen, E-Books |
| AI-Assistent | Ollama + Qdrant | Lokaler Chat mit Dokumenten-Upload und semantischer Suche |
| Bildung | Kolibri | Khan Academy Kurse, Fortschrittsverfolgung |
| Offline-Karten | ProtoMaps | Herunterladbare Regionalkarten mit Suche und Navigation |
| Datenwerkzeuge | CyberChef | Verschlüsselung, Kodierung, Hashing und Datenanalyse |
| Notizen | FlatNotes | Lokale Notizen mit Markdown-Unterstützung |
| Benchmark | Integriert | Hardware-Leistungsbewertung |

## Schnellinstallation

*Voraussetzungen: Debian-basiertes OS (Ubuntu empfohlen). sudo/root-Rechte erforderlich.*

```bash
sudo apt-get update && sudo apt-get install -y curl && curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/install_kamrad.sh -o install_kamrad.sh && sudo bash install_kamrad.sh
```

Nach der Installation öffnen Sie den Browser: `http://localhost:8080` (oder `http://GERÄTE_IP:8080`)

## Hardwareanforderungen

#### Minimum
- CPU: 2 GHz Dual-Core
- RAM: 4 GB
- Speicher: 5 GB frei
- OS: Debian-basiert (Ubuntu empfohlen)

#### Optimal (für AI)
- CPU: AMD Ryzen 7 / Intel Core i7
- RAM: 32 GB
- GPU: NVIDIA RTX 3060 oder gleichwertig
- Speicher: 250 GB SSD

## Mehrsprachigkeit

KAMRAD unterstützt mehrere Sprachen für Oberfläche und Inhalte:
- 🇷🇺 Русский (Hauptsprache)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇰🇿 Қазақша

## Datenschutz

- **Keine Telemetrie** — keine Daten werden gesammelt oder übertragen
- **Lokal zuerst** — alles bleibt auf Ihrem Gerät
- **Keine Konten** — funktioniert ohne Registrierung
- **Internet optional** — nur zum Herunterladen von Inhalten erforderlich

## Lizenz

Apache License 2.0 — siehe [LICENSE](LICENSE)

## Attribution

> Basierend auf [Project N.O.M.A.D.](https://github.com/Crosstalk-Solutions/project-nomad) von Crosstalk Solutions LLC.
> Originalprojekt lizenziert unter Apache License 2.0.
