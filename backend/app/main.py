from fastapi import FastAPI
from app.schemas import SymptomRequest, TriageResponse
from app.ai import triage_symptoms

app = FastAPI(
    title="Kairos AI Backend",
    description="Gen-AI powered healthcare triage and routing",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"status": "Kairos backend running"}

@app.post("/triage", response_model=TriageResponse)
def triage(request: SymptomRequest):
    result = triage_symptoms(request.symptoms)
    return result
