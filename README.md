# Kairos 🏥⚡  
**Real-time healthcare access, powered by Generative AI**


## 👥 Team

- [**Sokenu Abigail**](https://github.com/abbydave) — Frontend Developer  

- [**Ndujekwu Ugochukwu**](https://github.com/ndujesco) — Software Engineer



## 🔗 Project Links

- 🎥 [**Demo Video**](https://drive.google.com/file/d/1JD-Ud9-nGQA4oEAlboNbvb36Q9yl0oaT/view?usp=drivesdk)
- 📊 [**Pitch Deck**](https://drive.google.com/file/d/1ITHqGO5zest31y39NPS1j-Ptvsz20sCH/view?usp=drivesdk)
- 🌐 [**Live Demo**](https://kairos-tos-hub-innovation.vercel.app/)


## 🌍 SDGs Addressed

- **SDG 3:** Good Health and Well-Being (**MAJOR SDG**)
- **SDG 11:** Sustainable Cities and Communities  
- **SDG 16:** Peace, Justice, and Strong Institutions

## 🚨 Problem

Healthcare systems struggle with:
- Long physical queues and unpredictable wait times
- Repetitive patient paperwork at every visit
- Delayed outbreak detection that takes weeks instead of days

These issues overload hospitals, frustrate patients, and leave health agencies without timely data.


## 💡 Solution

**Kairos** is a real-time healthcare coordination platform that:
- Enables **virtual queuing and smart booking**
- Replaces repeated paperwork with **unified digital intake**
- Uses **Generative AI for instant symptom triage**
- Provides **live hospital dashboards** for staff
- Generates **anonymized national health analytics** for early outbreak detection


## ✨ Key Features

### 👤 For Patients
- View live hospital wait times and capacity
- Book time slots and join virtual queues
- Describe symptoms via text or voice
- Receive AI-recommended hospitals instantly
- One-tap emergency dispatch with AI scene analysis

### 🏥 For Hospitals
- Live queue and load monitoring
- Unified walk-in + online patient intake
- Ambulance tracking and case acceptance
- POS-style dashboard for fast registration

### 📊 For Health Agencies
- Real-time, anonymized national health data
- Early detection of outbreaks and trends
- Accurate capacity and utilization visibility


## 🤖 How Generative AI Is Used

Kairos uses Generative AI to:
- Understand symptoms from text and voice input  
- Perform instant triage and urgency classification  
- Recommend hospitals based on capacity and proximity  
- Analyze emergency audio clips when users cannot interact  
- Detect abnormal health patterns across anonymized data  

*Due to the complexity of these systems and their heavy reliance on large, high-quality datasets and real-world integrations, not all AI capabilities were fully implemented within the 24-hour hackathon window. The current build demonstrates the architectural approach, interfaces, and partial logic, with the remaining components designed for full deployment in a production environment.*


## 🧱 Tech Stack

### Frontend
- **React**
- Tailwind CSS

### Backend (in progress)
- **FastAPI**
- WebSockets (real-time hospital communication)
- Gemini-class LLM APIs for inference

### AI & Dev Tools
- Generative AI (LLMs + multimodal models)
- GitHub Copilot (development acceleration)



## 🚀 Getting Started

### Frontend (React)

```bash
git clone https://github.com/ndujesco/kairos.git
cd ./frontend
npm install
npm run dev

### Backend (FastAPI)

git clone https://github.com/ndujesco/kairos.git
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000