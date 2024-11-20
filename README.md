# Collaborative Flashcards with Whiteboard

A modern web application that combines spaced repetition learning with collaborative whiteboard functionality.

## Features

- Spaced repetition flashcards
- Real-time collaborative whiteboard
- Question management with various formats
- Progress tracking
- Group study sessions
- Export functionality

## Tech Stack

- Frontend: React, TLDraw, TypeScript
- Backend: Python FastAPI
- Database: PostgreSQL
- Real-time: WebSocket

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the database:
```bash
python scripts/init_db.py
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Development

The application is structured as follows:

- `/backend`: FastAPI server, database models, and API endpoints
- `/frontend`: React application with TypeScript
- `/scripts`: Database initialization and utility scripts
