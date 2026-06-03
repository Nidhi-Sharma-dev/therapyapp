"""Backend tests for Soundlull /api/catalog and /api/playlist endpoints."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://calm-therapy-audio.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/catalog ----------

class TestCatalog:
    def test_catalog_returns_200_and_counts(self, session):
        r = session.get(f"{API}/catalog", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert len(data["moods"]) == 5
        assert len(data["intensities"]) == 5
        assert data["durations"] == [5, 10, 15, 20, 30]
        # Verify mood structure
        mood_ids = {m["id"] for m in data["moods"]}
        assert {"stressed", "unfocused", "low_energy", "anxious", "restless"} == mood_ids
        intensity_ids = {i["id"] for i in data["intensities"]}
        assert "balanced" in intensity_ids


# ---------- /api/playlist ----------

class TestPlaylist:
    def test_playlist_valid_request(self, session):
        payload = {"mood_id": "stressed", "intensity_id": "balanced", "duration_minutes": 10}
        r = session.post(f"{API}/playlist", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["mood_id"] == "stressed"
        assert data["intensity_id"] == "balanced"
        assert data["duration_minutes"] == 10
        assert isinstance(data["session_id"], str) and len(data["session_id"]) > 0
        assert isinstance(data["tracks"], list) and len(data["tracks"]) > 0
        for t in data["tracks"]:
            assert "id" in t and "title" in t and "artist" in t and "url" in t
            assert t["url"].startswith("https://")

    def test_playlist_deterministic(self, session):
        payload = {"mood_id": "anxious", "intensity_id": "deep", "duration_minutes": 15}
        r1 = session.post(f"{API}/playlist", json=payload, timeout=15).json()
        r2 = session.post(f"{API}/playlist", json=payload, timeout=15).json()
        # session_id will differ but tracks should be identical (deterministic seeded selection)
        urls1 = [t["url"] for t in r1["tracks"]]
        urls2 = [t["url"] for t in r2["tracks"]]
        titles1 = [t["title"] for t in r1["tracks"]]
        titles2 = [t["title"] for t in r2["tracks"]]
        assert urls1 == urls2
        assert titles1 == titles2

    def test_invalid_mood(self, session):
        r = session.post(f"{API}/playlist", json={"mood_id": "happy", "intensity_id": "balanced", "duration_minutes": 10})
        assert r.status_code == 400

    def test_invalid_intensity(self, session):
        r = session.post(f"{API}/playlist", json={"mood_id": "stressed", "intensity_id": "wild", "duration_minutes": 10})
        assert r.status_code == 400

    def test_invalid_duration(self, session):
        r = session.post(f"{API}/playlist", json={"mood_id": "stressed", "intensity_id": "balanced", "duration_minutes": 7})
        assert r.status_code == 400
