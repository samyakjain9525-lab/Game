# Here are your Instructions

## Local Development

You can run the backend and frontend locally without Docker:

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # edit as needed
uvicorn server:app --reload
```

```bash
# Frontend (in a new terminal)
cd frontend
yarn install
yarn start
```

The React app will proxy API requests to `http://localhost:8000/api` (configure in your code if needed).

## Containerized Deployment (Recommended)

This repository is pre-configured for a full container deployment using Docker Compose. The stack consists of:

* **frontend** – React SPA served by Nginx on port **3000**
* **backend** – FastAPI application exposed on port **8000**
* **mongo** – MongoDB database for persistence

### Prerequisites

* Docker ≥ 24
* Docker Compose v2 (usually included with recent Docker Desktop / Engine)

### 1. Build & Run

```bash
# In the project root
docker compose up --build -d
```

After the first build you can simply run `docker compose up -d` to start the services.

Once running:

* Front-end: http://localhost:3000
* Back-end: http://localhost:8000/docs (interactive Swagger UI)
* MongoDB: mongodb://root:example@localhost:27017 (default credentials in compose file)

### 2. Environment Variables

Backend configuration is loaded from `backend/.env` (example file provided). When running via Compose you can adjust the credentials inside this file or override them in `docker-compose.yml`.

### 3. Production Deployment

Because Docker is used, you can deploy the same stack virtually anywhere:

* **Render / Railway / Fly.io** – one-click deploy using their Docker support.
* **AWS ECS / Fargate** – push the images to ECR and use the compose-to-ECS converter.
* **DigitalOcean Apps** – point to this repo; it will pick up `docker-compose.yml` automatically.
* **Self-hosted VPS** – install Docker Engine and run the same `docker compose up -d`.

### 4. Cleaning Up

```bash
docker compose down -v  # stops containers and removes volumes
```

---

Happy gaming! 🚀
