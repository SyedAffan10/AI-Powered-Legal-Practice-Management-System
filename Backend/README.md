# Backend - FastAPI Legal Practice Management

FastAPI backend for AI-Powered Legal Practice Management System with PostgreSQL database and Google Drive integration.

## Prerequisites

- Python 3.9+
- PostgreSQL
- Google Drive credentials (service account JSON)

## Setup

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r app/requirements.txt
   ```

3. Configure credentials:
   - Add `service_account_credentials.json` to `app/` directory
   - Update database connection in environment variables

## Running

Development server with auto-reload:
```bash
cd app
python -m uvicorn app:app --host 0.0.0.0 --port 8005 --reload
```

Docker:
```bash
docker-compose up -d
```

## API Documentation

Swagger UI: `http://localhost:8005/docs`

## Key Features

- JWT authentication with PassLib
- PostgreSQL database (SQLAlchemy ORM)
- Google Drive API integration
- File processing and formatting
- Multi-tenant role-based access control
- CORS enabled for frontend integration

## Project Structure

```
Backend/
├── app/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── template.py         # Template processing
│   ├── format.py           # Data formatting
│   └── portal_elite_avenue_format.py
├── Dockerfile
└── docker-compose.yaml
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET_KEY`: Secret key for JWT tokens
- `GOOGLE_CREDENTIALS_PATH`: Path to service account JSON
- `API_PORT`: Server port (default: 8005)

---

**Version**: 1.0.0
