# Elephant Production — Backend README

## Overview
This is the Node.js/Express/MongoDB CMS backend that powers the Elephant Production site.

---

## Setup

### 1. Configure Environment
```bash
cp .env.example .env
# Edit .env and fill in your MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database (first run only)
Imports all 8 films, collaborators, and site settings from the existing static data:
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development (auto-restarts on save)
npm run dev

# Production
npm start
```

The API will be running at: **http://localhost:4000**

---

## API Reference

### Public Endpoints (no auth needed)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/films` | Get all published films |
| GET | `/api/films/:id` | Get single film by slug |
| GET | `/api/collaborators` | Get all collaborators |
| GET | `/api/settings` | Get site settings (contact info, socials) |

### Admin Endpoints (Bearer token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login → returns JWT token |
| GET | `/api/auth/me` | Verify token & get current admin |
| GET | `/api/films/admin/all` | Get ALL films (incl. unpublished) |
| POST | `/api/films` | Create new film |
| PUT | `/api/films/:id` | Update film by slug |
| DELETE | `/api/films/:id` | Delete film by slug |
| PATCH | `/api/films/:id/toggle` | Toggle published/unpublished |
| POST | `/api/collaborators` | Create collaborator |
| PUT | `/api/collaborators/:id` | Update collaborator |
| DELETE | `/api/collaborators/:id` | Delete collaborator |
| PUT | `/api/settings` | Update site settings |

---

## Admin Login Example
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@elephantproduction.com","password":"your_password"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": { "id": "...", "email": "admin@elephantproduction.com" }
}
```

Use the token in all admin requests:
```bash
curl -X PUT http://localhost:4000/api/films/savoy \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{"title":"Savoy Updated"}'
```

---

## Folder Structure
```
backend/
├── server.js              ← Express entry point
├── .env.example           ← Environment template
├── models/
│   ├── Film.js            ← Film schema (all film data)
│   ├── Collaborator.js    ← Collaborator schema
│   ├── SiteSettings.js    ← Contact info, socials (singleton)
│   └── Admin.js           ← Admin user with bcrypt password
├── routes/
│   ├── auth.js            ← Login & token verification
│   ├── films.js           ← Full CRUD for films
│   ├── collaborators.js   ← Full CRUD for collaborators
│   └── settings.js        ← Get/update site settings
├── middleware/
│   └── auth.js            ← JWT verification middleware
└── scripts/
    └── seed.js            ← One-time data import from static files
```
