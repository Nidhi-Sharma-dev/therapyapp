from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import random
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Soundlull Mood Wellness API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Static catalog ----------

MOODS = [
    {"id": "stressed", "label": "Seeking Serenity",  "subtitle": "Stressed",      "icon": "Wind",     "description": "Soften the edges of a heavy day."},
    {"id": "unfocused", "label": "Seeking Clarity",  "subtitle": "Unfocused",     "icon": "Droplets", "description": "Settle scattered thoughts into one quiet stream."},
    {"id": "low_energy","label": "Seeking Renewal",  "subtitle": "Low Energy",    "icon": "Sun",      "description": "Invite warmth back into your body."},
    {"id": "anxious",   "label": "Seeking Grounding","subtitle": "Anxious",       "icon": "Mountain", "description": "Return to the steady earth beneath you."},
    {"id": "restless",  "label": "Seeking Peace",    "subtitle": "Restless",      "icon": "Feather",  "description": "Let the body slow to the breath."},
]

INTENSITIES = [
    {"id": "gentle",    "label": "Gentle",    "description": "Whisper-soft, barely there."},
    {"id": "mild",      "label": "Mild",      "description": "A light, easy embrace."},
    {"id": "balanced",  "label": "Balanced",  "description": "Even, grounding presence."},
    {"id": "deep",      "label": "Deep",      "description": "Immersive resonance."},
    {"id": "immersive", "label": "Immersive", "description": "Full, enveloping landscape."},
]

DURATIONS = [5, 10, 15, 20, 30]

# Royalty-free demo audio (SoundHelix instrumentals) — 16 tracks
AUDIO_POOL = [
    {"id": f"song-{i}", "url": f"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-{i}.mp3"}
    for i in range(1, 17)
]

# Track titles & artist names per mood for the curated experience
MOOD_THEMES = {
    "stressed": {
        "artist": "Hollow Pines",
        "titles": ["Dusk Over Still Water", "Slow Exhale", "Cedar & Quiet", "Long Light Returning", "The Pause Between", "Soft Hands of Evening"],
    },
    "unfocused": {
        "artist": "Reed & River",
        "titles": ["One Steady Thread", "Tide Pulls Inward", "A Room With One Window", "Single Lit Candle", "The Mind Coming Home", "Threading Calm"],
    },
    "low_energy": {
        "artist": "Marigold Choir",
        "titles": ["Slow Sun Returning", "Tea Steam Rising", "Warm Wood Floor", "First Yellow Light", "Honey Hour", "The Body Remembers"],
    },
    "anxious": {
        "artist": "Stonefield Trio",
        "titles": ["Anchor in the Sand", "Roots Below the Storm", "Held by the Mountain", "Heavy & Held", "Earth Under Feet", "Quiet Granite"],
    },
    "restless": {
        "artist": "Linen Sky",
        "titles": ["Folding the Day Away", "Breath, Then Breath", "Linen on the Line", "Soft Room, Soft Hour", "A Slow Sky", "Falling Open"],
    },
}


def build_playlist(mood_id: str, intensity_id: str, duration_min: int) -> dict:
    """Pre-curated, deterministic playlist composition."""
    theme = MOOD_THEMES.get(mood_id, MOOD_THEMES["stressed"])
    # Average track length ~ 6 min; pick enough tracks to fill the requested duration
    n_tracks = max(2, min(6, round(duration_min / 5)))
    # Seeded selection so the same mood+intensity+duration is reproducible
    seed_str = f"{mood_id}-{intensity_id}-{duration_min}"
    rng = random.Random(seed_str)
    audio_choices = rng.sample(AUDIO_POOL, k=n_tracks)
    title_choices = rng.sample(theme["titles"], k=n_tracks)
    tracks = []
    for idx, (audio, title) in enumerate(zip(audio_choices, title_choices)):
        tracks.append({
            "id": f"{seed_str}-{idx}",
            "title": title,
            "artist": theme["artist"],
            "url": audio["url"],
        })
    return {
        "session_id": str(uuid.uuid4()),
        "mood_id": mood_id,
        "intensity_id": intensity_id,
        "duration_minutes": duration_min,
        "tracks": tracks,
    }


# ---------- Schemas ----------

class PlaylistRequest(BaseModel):
    mood_id: str
    intensity_id: str
    duration_minutes: int


class Track(BaseModel):
    id: str
    title: str
    artist: str
    url: str


class PlaylistResponse(BaseModel):
    session_id: str
    mood_id: str
    intensity_id: str
    duration_minutes: int
    tracks: List[Track]


class CatalogResponse(BaseModel):
    moods: List[dict]
    intensities: List[dict]
    durations: List[int]


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Soundlull Mood Wellness API"}


@api_router.get("/catalog", response_model=CatalogResponse)
async def get_catalog():
    return CatalogResponse(moods=MOODS, intensities=INTENSITIES, durations=DURATIONS)


@api_router.post("/playlist", response_model=PlaylistResponse)
async def create_playlist(req: PlaylistRequest):
    valid_moods = {m["id"] for m in MOODS}
    valid_intensities = {i["id"] for i in INTENSITIES}
    if req.mood_id not in valid_moods:
        raise HTTPException(status_code=400, detail="Invalid mood_id")
    if req.intensity_id not in valid_intensities:
        raise HTTPException(status_code=400, detail="Invalid intensity_id")
    if req.duration_minutes not in DURATIONS:
        raise HTTPException(status_code=400, detail="Invalid duration_minutes")
    return PlaylistResponse(**build_playlist(req.mood_id, req.intensity_id, req.duration_minutes))


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
