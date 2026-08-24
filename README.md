# Historia

Historical awareness platform for lesser-known heritage sites across West Bengal — stories, visuals, and events in a modern web interface.

**Live demo:** [teamhistoria.netlify.app](https://teamhistoria.netlify.app/)

## Features

- Explore historical places (monuments, temples, forts, museums, and more)
- Image gallery with uploads
- Story section for local historical narratives
- Event section with location, time, and venue
- Auth (signup / login) with profile editing
- Location-based filtering and search
- Likes and comments
- Admin dashboards for users, posts, and events
- Smooth motion with GSAP and Framer Motion

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18, Vite, Tailwind CSS, Redux Toolkit, React Router, Axios, GSAP, Framer Motion |
| Backend | Node.js, Express, MongoDB / Mongoose, JWT, bcrypt |
| Media | Cloudinary, Multer |
| Deploy | Netlify |

## Project Structure

```text
Historia-2.0/
├── FRONTEND/    # React + Vite app
└── BACKEND/     # Express API
```

## Getting Started

### Frontend

```bash
git clone https://github.com/Aritra59/Historia-2.0.git
cd Historia-2.0/FRONTEND
npm install
npm run dev
```

### Backend

```bash
cd Historia-2.0/BACKEND
npm install
# configure .env (MongoDB URI, JWT secret, Cloudinary, etc.)
npm run dev
```

## Team

| Member | Role |
| --- | --- |
| Aritra Maity | Planning and frontend |
| Pabitra Sahoo | Research and frontend |
| Md Iftejab Mondal | Planning and UI/UX |
| Soumoditya Pal | Research and UI/UX |
| Dipayan Chowdhury | Testing and backend |
| Aparup Santra | Documentation and backend |

## License

Developed for academic and educational purposes. © 2025 Team Historia.
