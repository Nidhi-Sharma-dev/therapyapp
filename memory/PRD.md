# Soundlull — Mood Wellness Audio Therapy

## Original Problem Statement
Build a frontend-first Mood Wellness Audio Therapy app with a 3-step wizard (Mood → Intensity → Duration), a calming loading transition, an audio therapy player, a post-session feedback check-in, and a completion screen. UI must feel intuitive, calming, intentional, and work for elders, millennials, and Gen Z.

## User Choices (confirmed)
- Audio source: royalty-free demo URLs (SoundHelix)
- Backend logic: pre-curated, deterministic static playlists
- Auth: none (anonymous, session-only)
- Theme: soft pastel calm (sage, cream, dusty rose)
- Feedback screen: full interactive UI but frontend-only (no DB persistence)

## Architecture
- **Backend**: FastAPI (`/app/backend/server.py`)
  - `GET /api/catalog` → moods, intensities, durations
  - `POST /api/playlist` → deterministic curated playlist (seeded by mood+intensity+duration)
- **Frontend**: React + Tailwind + Framer Motion
  - Wizard state machine in `pages/Soundlull.jsx`
  - Modular components in `components/wellness/`
  - Custom palette + breathing animations in `tailwind.config.js` / `index.css`
  - Fonts: Cormorant Garamond (headings) + Outfit (body)

## Implemented (Feb 2026)
- Welcome screen with breathing orb hero
- Mood selector — 5 calming labels (Seeking Serenity / Clarity / Renewal / Grounding / Peace)
- Intensity selector — 5 levels with visual meter
- Duration selector — 5/10/15/20/30 minutes with poetic sub-labels
- Calming loading transition (breathing orbs + "Curating your peace…")
- Audio player — breathing visualizer, play/pause/skip/prev, progress bar, volume, mute, collapsible queue, session meta card
- Feedback screen — "How are you feeling now?" with 5 options
- Completion screen with restart CTA
- Wizard progress indicator across all steps
- Grain noise overlay, ambient blob backgrounds, micro-animations on every interaction
- Full data-testid coverage for all interactive elements

## User Personas
- Elders — large touch targets (≥48px), high contrast, generous spacing
- Millennials — editorial typography, soft palette, modern wellness aesthetic
- Gen Z — micro-animations, asymmetric layouts, distinctive font pairing

## Backlog (P1 / P2)
- P1: Persist session history (requires auth or anonymous session id)
- P1: Real curated royalty-free wellness audio (replace SoundHelix demo tracks)
- P1: Breathing-guide overlay synced to track (inhale/hold/exhale prompts)
- P2: Share completion card image (generate downloadable PNG)
- P2: Daily streak / gentle reminders (requires auth)
- P2: Custom session length input (slider beyond preset 5–30 min)
- P2: Spotify / Apple Music integration for users with paid accounts

## Test Coverage
- Backend: 100% (6/6) — catalog counts, happy path, determinism, 400s for invalid input
- Frontend: 100% happy path — full wizard, player controls, feedback, completion, restart
- Tests: `/app/backend/tests/test_soundlull_api.py`
