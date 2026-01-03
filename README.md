## BASIC SHIT
```bash
git clone https://github.com/me-is-mukul/NONCHALANT-JIIT-PLANNER.git
cd NONCHALANT-JIIT-PLANNER
cd backend
npm install
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../frontend
npm install
```

## OPEN 3 TERMINAL SESSIONS 
2 session in backend 1 session in frontend

### inside backend
```bash
uvicorn server:app --reload --port 8000  #session 1 make sure venv activate
node server.js          #session 2
```
### inside frontend
```bash
npm run dev
#( follow the port it displays )
```
