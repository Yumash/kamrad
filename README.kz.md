<div align="center">
<img src="image.jpg" width="200" height="200"/>

# КАМРАД Жобасы.
### Автономды Медиа, Мұрағат және Деректер Түйіні

**Ешқашан оффлайн болмайтын білім**

[![GitHub](https://img.shields.io/badge/GitHub-Yumash%2Fkamrad-blue)](https://github.com/Yumash/kamrad)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

🌐 [English](README.en.md) | [Русский](README.md) | [Deutsch](README.de.md) | **Қазақша**

</div>

---

КАМРАД жобасы — кірістірілген AI-чат, кітапханалар, карталар және құралдармен жабдықталған автономды, оффлайн-бағытталған білім және білім беру сервері — барлығы бір жерде, интернетсіз.

## Мүмкіндіктер

| Мүмкіндік | Негізі | Не аласыз |
|-----------|--------|-----------|
| Білім кітапханасы | Kiwix | Оффлайн Уикипедия, медициналық анықтамалар, нұсқаулықтар, кітаптар |
| AI-көмекші | Ollama + Qdrant | Құжаттарды жүктеу және семантикалық іздеу бар жергілікті чат |
| Білім беру | Kolibri | Khan Academy курстары, прогресті бақылау |
| Оффлайн карталар | ProtoMaps | Іздеу және навигация бар жүктелетін аймақтық карталар |
| Деректер құралдары | CyberChef | Шифрлау, кодтау, хэштеу және деректерді талдау |
| Жазбалар | FlatNotes | Markdown қолдауымен жергілікті жазбалар |
| Бенчмарк | Кірістірілген | Жабдық өнімділігін бағалау |

## Жылдам орнату

*Талаптар: Debian негізіндегі ОЖ (Ubuntu ұсынылады). sudo/root құқықтары қажет.*

```bash
sudo apt-get update && sudo apt-get install -y curl && curl -fsSL https://raw.githubusercontent.com/Yumash/kamrad/refs/heads/main/install/install_kamrad.sh -o install_kamrad.sh && sudo bash install_kamrad.sh
```

Орнатудан кейін браузерді ашыңыз: `http://localhost:8080` (немесе `http://ҚҰРЫЛҒЫ_IP:8080`)

## Жабдық талаптары

#### Минималды
- CPU: 2 ГГц, екі ядролы
- RAM: 4 ГБ
- Сақтау: 5 ГБ бос орын
- ОЖ: Debian негізіндегі (Ubuntu ұсынылады)

#### Оңтайлы (AI үшін)
- CPU: AMD Ryzen 7 / Intel Core i7
- RAM: 32 ГБ
- GPU: NVIDIA RTX 3060 немесе балама
- Сақтау: 250 ГБ SSD

## Көптілділік

КАМРАД бірнеше тілді қолдайды:
- 🇷🇺 Русский (негізгі)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇰🇿 Қазақша

## Құпиялылық

- **Нөлдік телеметрия** — ешқандай деректер жиналмайды
- **Жергілікті** — барлығы құрылғыңызда сақталады
- **Тіркелгісіз** — тіркелусіз жұмыс істейді
- **Интернет міндетті емес** — тек мазмұнды жүктеу үшін қажет

## Лицензия

Apache License 2.0 — [LICENSE](LICENSE) қараңыз

## Attribution

> [Crosstalk Solutions LLC](https://github.com/Crosstalk-Solutions/project-nomad) компаниясының [Project N.O.M.A.D.](https://github.com/Crosstalk-Solutions/project-nomad) жобасы негізінде жасалған.
> Түпнұсқа жоба Apache License 2.0 бойынша лицензияланған.
