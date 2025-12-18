import os
import json
from dotenv import load_dotenv
from google.genai import Client, types

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-2.5-flash"

SYSTEM_PROMPT = """
You are a medical triage assistant.

Rules:
- Do NOT diagnose
- Do NOT prescribe medication
- Only provide triage-level guidance
- Be concise and safe

You must return STRICT JSON with the following keys:
summary, urgency, recommended_care, advice

Urgency must be one of:
Low, Medium, High, Emergency

Recommended care must be one of:
Clinic, General Hospital, Tertiary Hospital
"""


def triage_symptoms(symptoms: str) -> dict:
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=[
            types.Content(
                role="user",
                parts=[
                    types.Part(
                        text=f"{SYSTEM_PROMPT}\n\nSymptoms:\n{symptoms}"
                    )
                ]
            )
        ],
        config=types.GenerateContentConfig(
            temperature=0.2
        )
    )

    try:
        text = response.text.strip()
        text = text.replace("```json", "").replace("```", "")
        return json.loads(text)

    except Exception:
        return {
            "summary": "Unable to summarize symptoms.",
            "urgency": "Unknown",
            "recommended_care": "General Hospital",
            "advice": "Please seek professional medical attention."
        }
