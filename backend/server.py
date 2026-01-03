from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pyjiit import Webportal
from pyjiit.default import CAPTCHA

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     
    allow_methods=["*"],     
    allow_headers=["*"],     
    allow_credentials=False, 
)

class Credentials(BaseModel):
    username: str
    password: str

@app.post("/getsub")
def get_registered_subjects(creds: Credentials):
    try:
        w = Webportal()
        w.student_login(creds.username, creds.password, CAPTCHA)

        semesters = w.get_registered_semesters()
        if not semesters:
            raise HTTPException(status_code=404, detail="No semesters found")

        sem = semesters[0]
        reg = w.get_registered_subjects_and_faculties(sem)

        codes = sorted({s.subject_code for s in reg.subjects})

        return {"subjects": codes}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
