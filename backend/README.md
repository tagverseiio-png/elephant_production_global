# Elephant Production — Backend

Node.js/Express/MongoDB CMS backend (TypeScript) for the Elephant Production site.

---

## Setup

### 1. Configure Environment
```bash
cp .env.example .env
# Edit .env and fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database (first run only)
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development (auto-restarts on save via tsx watch)
npm run dev

# Production (compile then start)
npm run build
npm start
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run in development with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled JS from `dist/` |
| `npm run seed` | Seed database with initial data |

---

## API Reference

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/films` | Get all published films |
| GET | `/api/films/:id` | Get single film by slug |
| GET | `/api/collaborators` | Get all collaborators |
| GET | `/api/settings` | Get site settings |

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

## Project Structure
```
backend/
├── server.ts              ← Entry point (TypeScript)
├── tsconfig.json          ← TypeScript config
├── .env.example           ← Environment template
├── models/
│   ├── Film.ts            ← Film schema (all film data)
│   ├── Collaborator.ts    ← Collaborator schema
│   ├── SiteSettings.ts    ← Contact info, socials (singleton)
│   └── Admin.ts           ← Admin user with bcrypt password
├── routes/
│   ├── auth.ts            ← Login & token verification
│   ├── films.ts           ← Full CRUD for films
│   ├── collaborators.ts   ← Full CRUD for collaborators
│   └── settings.ts        ← Get/update site settings
├── middleware/
│   └── auth.ts            ← JWT verification middleware
└── scripts/
    └── seed.ts            ← Seed database with initial data
```
