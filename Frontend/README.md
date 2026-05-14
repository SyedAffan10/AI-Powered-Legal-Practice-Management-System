# Frontend - React Legal Practice Management

React 19 + TypeScript frontend for AI-Powered Legal Practice Management System with Vite and Tailwind CSS.

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   - Create `.env` file with backend API URL
   - `VITE_API_URL=http://localhost:8005`

## Development

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Lint code:
```bash
npm run lint
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Redux Toolkit** - State management
- **React Router 7** - Routing
- **React Hook Form + Zod** - Form validation
- **Radix UI** - UI components
- **Recharts** - Data visualization

## Project Structure

```
Frontend/
├── src/
│   ├── pages/         # Page components (admin, agency, agent, client)
│   ├── components/    # Reusable components
│   ├── features/      # Feature modules (auth, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── lib/           # Utilities
│   ├── App.tsx
│   └── routes.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## User Roles

- **Super Admin** - System administration and analytics
- **Agency** - Agency management and operations
- **Legal Agent** - Case and matter management
- **Client** - Document and matter access

## Deployment

Configured for Vercel (see `vercel.json`). Build output: `dist/`

---

**Version**: 1.0.0
