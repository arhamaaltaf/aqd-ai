---
title: Aqd AI
emoji: ⚖️
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 7860
pinned: false
---

# Aqd AI Flask + Lovable Integration

Aqd AI combines the Lovable React frontend in `aqd-ai/` with a Flask RAG backend built from `Full_Working_Code.ipynb`.

## Local Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

cd aqd-ai
npm install --legacy-peer-deps
npm run build
cd ..

copy .env.example .env
```

Add your real `GROQ_API_KEY`, `PINECONE_API_KEY`, and `PINECONE_INDEX_NAME` to `.env`, then run:

```bash
python flask_app.py
```

Open `http://localhost:7860`.

## API

`POST /api/analyze`

Accepts either:

- JSON: `{ "contractText": "..." }`
- multipart form data with field `file` for `.pdf`, `.docx`, or `.txt`

Returns the scanner shape used by the frontend:

```json
{
  "success": true,
  "contractText": "...",
  "findings": [],
  "summary": {
    "violations": 0,
    "uncertain": 0,
    "compliant": 0,
    "text": "..."
  }
}
```

`GET /api/health` reports whether required secrets and `chunks_backup.pkl` are available.
