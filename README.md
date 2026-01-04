## BASIC SHIT
```bash
git clone https://github.com/me-is-mukul/NONCHALANT-JIIT-PLANNER.git
cd NONCHALANT-JIIT-PLANNER
cd backend
npm i
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../frontend
npm i
**Docker Deployment**

This repository contains a Node backend and a Vite React frontend. The project includes Dockerfiles for each service and a `docker-compose.yml` to run them together.

Quick start (build and run with docker-compose):

```bash
docker compose build
docker compose up -d
```

Services:
- **backend**: Node.js Express app running on port `3000` inside the container (mapped to `3000` on the host).
- **frontend**: Vite-built production site served by `nginx` on port `80` (mapped to `80` on the host).

Notes:
- Backend data files are mounted read-only from `./backend/data` so you can update JSON data locally without rebuilding.
- To see logs:

```bash
docker compose logs -f backend
docker compose logs -f frontend
```

Stopping and removing containers:

```bash
docker compose down
```

Build individual images:

```bash
# Backend image
docker build -t planner-backend ./backend

# Frontend image
docker build -t planner-frontend ./frontend
```

Environment:
- The backend reads `PORT` from environment; the compose file sets it to `3000` by default.

If you prefer local development (without Docker), follow the original steps in the respective `backend` and `frontend` folders.
