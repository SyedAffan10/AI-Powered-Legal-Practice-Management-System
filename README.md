# Tudor - AI-Powered Legal Practice Management System

A comprehensive, multi-tenant AI-driven legal practice management platform designed for law firms and agencies to intelligently manage cases, clients, legal agents, and operations efficiently.

## Overview

Tudor is a full-stack web application that revolutionizes legal practice operations with AI-powered automation, role-based access control, intelligent case management, document handling, and advanced analytics. The platform supports four primary user roles: **Super Admin**, **Agency**, **Legal Agent**, and **Client**.

## Understanding Legal Agents

**Legal Agents** are practicing attorneys, paralegals, or legal professionals assigned to agencies who handle cases, interact with clients, and manage legal matters. They:
- Manage assigned cases and legal matters
- Handle client communications and consultations
- Maintain detailed case documentation and notes
- Track tasks, deadlines, and action items
- Access and organize client documents
- Log activities and maintain audit trails
- Collaborate with other team members on cases

## Features

### AI-Powered Capabilities
- **Intelligent Case Analysis**: AI-driven insights and recommendations for case management
- **Automated Document Processing**: Smart extraction and formatting of legal documents
- **Predictive Analytics**: Machine learning-based forecasting for case outcomes and timelines
- **Smart Notifications**: AI-prioritized alerts and reminders for critical deadlines
- **Intelligent Search**: Advanced document and case search with semantic understanding

### For Super Admin
- AI Dashboard with predictive analytics and key metrics
- Agency management and oversight with AI insights
- Subscription & payment tracking with anomaly detection
- System configuration and settings
- Package management with usage analytics

### For Agencies
- AI-enhanced agency dashboard with operational insights
- Intelligent agent management and workload optimization
- AI-assisted matter (case) management and tracking
- Smart client relationship management
- Subscription and billing analytics
- Automated task and activity management

### For Legal Agents
- Personalized dashboard with AI-prioritized workload
- Intelligent matter handling and case recommendations
- Smart document storage and AI-powered retrieval
- Automated activity logging and task tracking
- AI-enhanced client communication history

### For Clients
- Smart dashboard with case status and AI predictions
- Intelligent document access and recommendations
- Summarized activity logs powered by AI
- Smart task tracking with deadline predictions
- Real-time notifications

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Authentication**: JWT + PassLib
- **Database**: PostgreSQL (via SQLAlchemy)
- **External Integration**: Google Drive API
- **Server**: Uvicorn

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI + Custom Components
- **Forms**: React Hook Form + Zod
- **Routing**: React Router 7
- **Charts**: Recharts
- **Notifications**: Sonner Toast
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: Vercel (Frontend)
- **CORS**: Enabled for multi-origin support

## Project Structure

```
Tudor/
├── Backend/
│   ├── app/
│   │   ├── app.py                      # FastAPI main application
│   │   ├── requirements.txt            # Python dependencies
│   │   ├── template.py                 # Template processing
│   │   ├── format.py                   # Data formatting utilities
│   │   └── portal_elite_avenue_format.py
│   ├── Dockerfile
│   └── docker-compose.yaml
│
└── Frontend/
    ├── src/
    │   ├── pages/                      # Route-specific pages
    │   │   ├── admin/                  # Super Admin pages
    │   │   ├── agency/                 # Agency pages
    │   │   ├── agent/                  # Agent pages
    │   │   ├── client/                 # Client pages
    │   │   └── login/
    │   ├── components/                 # Reusable React components
    │   │   ├── ui/                     # UI component library
    │   │   └── layout/
    │   ├── features/                   # Feature modules (auth, etc.)
    │   ├── hooks/                      # Custom React hooks
    │   ├── services/                   # API and service layer
    │   ├── lib/                        # Utility functions
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── routes.ts
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── vercel.json
```

## Installation

### Prerequisites
- Node.js 18+ (Frontend)
- Python 3.9+ (Backend)
- Docker & Docker Compose (optional, for containerized setup)
- PostgreSQL (for database)

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r app/requirements.txt
   ```

4. Configure Google Drive credentials:
   - Place `service_account_credentials.json` in the `Backend/app/` directory

5. Run the server:
   ```bash
   cd app
   python -m uvicorn app:app --host 0.0.0.0 --port 8005 --reload
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Docker Setup

Run the entire stack with Docker Compose:

```bash
cd Backend
docker-compose up -d
```

## API Endpoints

The FastAPI backend provides RESTful endpoints for:
- User authentication and authorization
- Agency and agent management
- Case/matter operations
- Document upload and management
- Payment and subscription tracking
- File processing and formatting (Google Drive integration)

Access the API documentation at: `http://localhost:8005/docs` (Swagger UI)

## Environment Configuration

Create a `.env` file in the Backend and Frontend directories with necessary configuration:

**Backend (.env)**:
- Database connection string
- Google Drive credentials path
- JWT secret key
- API port

**Frontend (.env)**:
- Backend API URL
- Google Analytics (if applicable)
- Vercel deployment settings

## Key Functionalities

- **AI-Powered Automation**: Intelligent automation of routine legal tasks and workflows
- **Multi-tenant Architecture**: Complete role-based access control with AI-driven permissions
- **Smart Document Management**: AI-powered Google Drive integration with semantic search
- **Intelligent Case Tracking**: AI-assisted end-to-end matter/case management
- **Predictive Analytics Dashboard**: Real-time AI insights for admins and agencies
- **Responsive AI-Enhanced UI**: Mobile-friendly design with intelligent recommendations
- **Smart Notifications**: AI-prioritized toast notifications via Sonner
- **Type-Safe Development**: Full TypeScript support in frontend
- **Intelligent Form Validation**: Zod schema validation with React Hook Form
- **AI Legal Agent Optimization**: Intelligent workload distribution and case assignment

## Development

### Available Scripts

**Frontend**:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Backend**:
```bash
python -m uvicorn app:app --reload  # Development server with auto-reload
```

## Deployment

### Frontend
- Configured for **Vercel** deployment (see `vercel.json`)
- Build output: `dist/`

### Backend
- Docker containerization ready
- Environment-based configuration
- Supports cloud deployment (AWS, Azure, GCP)

## Security Considerations

- JWT-based authentication with PassLib hashing
- CORS middleware configured
- Type validation with Zod schemas
- Environment variable protection
- Google Service Account authentication for Drive API

## Contributing

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Ensure code follows project conventions
4. Test thoroughly before submitting
5. Create a Pull Request with detailed description

## License

[Add your license information here]

## Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**Last Updated**: May 2026  
**Version**: 1.0.0
