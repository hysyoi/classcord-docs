# Classcord — 技術架構文件

以「伺服器 ➜ 頻道」為根基的 Discord 式即時社群互動，結合教材專屬 AI 助教（RAG）。
後端由 **Gateway + Main Service + AI Service** 三個 Spring Boot 微服務組成，由 Nacos / Sentinel / Seata 統一治理，PostgreSQL + pgvector 與 Redis 支撐資料層，RabbitMQ 負責跨服務與服務內的非同步解耦。

`Java 21` `Spring Boot 3.3` `Spring Cloud (Nacos, Gateway, OpenFeign, Sentinel, Seata)` `Spring AI` `Spring Security` `PostgreSQL + pgvector` `Redis 7` `RabbitMQ` `Docker → K3s` `GitHub Actions` `Backblaze B2` `Flyway` `Prometheus + Grafana` `JUnit 5 + Mockito`

## 完整文件

**➡️ [https://hysyoi.github.io/classcord-docs/](https://hysyoi.github.io/classcord-docs/)**

涵蓋整體架構、K3s 部署、三個服務的深入實作，Redis / Seata / RabbitMQ 的橫切設計取捨，以及一份實測的壓力測試報告。

## 本機開發

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

推上 `main` 分支會透過 `.github/workflows/deploy.yml` 自動建置並部署到 GitHub Pages。
