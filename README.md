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
```
**Overview**

This repo contains three services:
- `node-backend` — Express server (handles `/fetch`) exposed on port `3000`.
- `python-backend` — FastAPI server (handles `/getsub`) exposed on port `8000`.
- `frontend` — Vite React app built and served with `nginx` on port `80`.

All three services have Dockerfiles and a `docker-compose.yml` at the project root to run them together.

**Quick Docker deploy**

Build and start in detached mode:

```bash
docker compose build
docker compose up -d
```

Check logs:

```bash
docker compose logs -f node-backend
docker compose logs -f python-backend
docker compose logs -f frontend
```

Stop and remove containers:

```bash
docker compose down
```

**Service endpoints (host ports)**
- Node backend: http://localhost:3000 (POST `/fetch`)
- Python backend: http://localhost:8000 (POST `/getsub`)
- Frontend: http://localhost/ or http://localhost:80

**Build images individually**

```bash
docker build -t planner-node-backend -f backend/Dockerfile ./backend
docker build -t planner-python-backend -f backend/python.Dockerfile ./backend
docker build -t planner-frontend ./frontend
```

**Local development (without Docker)**

Node backend (Express):

```bash
cd backend
npm install
# run development server
npm run dev   # uses nodemon; server.js listens on PORT (default 3000)
```

Python backend (FastAPI):

```bash
cd backend
python -m venv venv
# Windows PowerShell
venv\Scripts\Activate.ps1
# or on Bash/macOS
source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Frontend (Vite):

```bash
cd frontend
npm install
npm run dev
```

**Notes and tips**
- The `node-backend` service reads JSON files from `./backend/data`; the compose setup mounts that folder read-only so you can edit data locally without rebuilding the image.
- If you change Python dependencies, rebuild the `python-backend` image.
- On Windows, use `docker compose` (modern Compose V2) from PowerShell or CMD.

If you want, I can run a local `docker compose build` and `docker compose up` here to verify everything builds and starts — permit me to run those commands in your terminal if you'd like.

