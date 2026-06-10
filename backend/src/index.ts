import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import {
  MOOD_INTENSITY_MAP,
  getIntensityRange,
  FRONTEND_TO_BACKEND_MOOD,
  FRONTEND_INTENSITY_TO_NUMBER,
} from './data/moodMappings';
import { AudioArchiveService } from './services/audioArchiveService';
import { PlaylistBuilder } from './utils/playlistBuilder';

const audioArchiveService = new AudioArchiveService();
const apiRouter = Router();

// ── Static catalog ──

const MOODS = [
  { id: 'stressed',   label: 'Seeking Serenity',  subtitle: 'Stressed',   icon: 'Wind',     description: 'Soften the edges of a heavy day.' },
  { id: 'unfocused',  label: 'Seeking Clarity',   subtitle: 'Unfocused',  icon: 'Droplets', description: 'Settle scattered thoughts into one quiet stream.' },
  { id: 'low_energy', label: 'Seeking Renewal',   subtitle: 'Low Energy', icon: 'Sun',      description: 'Invite warmth back into your body.' },
  { id: 'anxious',    label: 'Seeking Grounding', subtitle: 'Anxious',    icon: 'Mountain', description: 'Return to the steady earth beneath you.' },
  { id: 'restless',   label: 'Seeking Peace',     subtitle: 'Restless',   icon: 'Feather',  description: 'Let the body slow to the breath.' },
];

const INTENSITIES = [
  { id: 'gentle',    label: 'Gentle',    description: 'Whisper-soft, barely there.' },
  { id: 'mild',      label: 'Mild',      description: 'A light, easy embrace.' },
  { id: 'balanced',  label: 'Balanced',  description: 'Even, grounding presence.' },
  { id: 'deep',      label: 'Deep',      description: 'Immersive resonance.' },
  { id: 'immersive', label: 'Immersive', description: 'Full, enveloping landscape.' },
];

const DURATIONS = [5, 10, 15, 20, 30];

// ── Fallback tracks ──

const FALLBACK_POOL = [
  { title: 'Dusk Over Still Water', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Slow Exhale',            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'Cedar & Quiet',          url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { title: 'Long Light Returning',   url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { title: 'The Pause Between',      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { title: 'Soft Hands of Evening',  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
];

function fallbackTracks(mood: string, intensity: number, count: number) {
  return FALLBACK_POOL.slice(0, count).map((t, i) => ({
    id: `fb_${mood.toLowerCase().replace(/\s+/g, '_')}_${intensity}_${i}`,
    title: t.title,
    artist: 'Soundlull Reserve',
    duration: 240,
    audioUrl: t.url,
  }));
}

// ── Core pipeline ──

async function generateTracks(
  moodName: string,
  intensity: number,
  sessionDuration: number,
  musicPreferences: string[] = [],
) {
  const moodConfig = MOOD_INTENSITY_MAP[moodName];
  if (!moodConfig) {
    throw { status: 400, body: { error: 'ValidationError', message: `Unknown currentMood '${moodName}'` } };
  }

  const bucket = getIntensityRange(intensity);
  const mapping = moodConfig[bucket];
  const searchQuery = mapping.searchQuery;
  const targetTags = mapping.targetTags;

  let pool = await audioArchiveService.fetchWellnessTracks(searchQuery);

  if (pool.length < 5) {
    const fallback = await audioArchiveService.fetchWellnessTracks('instrumental music');
    pool = [...pool, ...fallback];
  }

  const structured = pool.map((track) => ({
    doc: track,
    subjects: [searchQuery, ...targetTags],
  }));

  let selected = PlaylistBuilder.buildSessionPlaylist(structured, sessionDuration, targetTags, musicPreferences);

  if (selected.length === 0) {
    selected = pool.slice(0, 2);
  }

  if (selected.length === 0) {
    selected = fallbackTracks(moodName, intensity, Math.max(2, Math.min(6, Math.round(sessionDuration / 5))));
  }

  return { tracks: selected, searchQuery, targetTags, bucket };
}

// ── Routes ──

apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Soundlull Mood Wellness API' });
});

apiRouter.get('/catalog', (_req: Request, res: Response) => {
  res.json({ moods: MOODS, intensities: INTENSITIES, durations: DURATIONS });
});

apiRouter.post('/music-wellness/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentMood, intensity, desiredMood, musicPreferences, sessionDuration } = req.body;

    if (!currentMood || !desiredMood || !Array.isArray(musicPreferences) || !sessionDuration) {
      res.status(400).json({ error: 'ValidationError', message: 'Missing or malformed mandatory parameters.' });
      return;
    }

    if (typeof intensity !== 'number' || intensity < 1 || intensity > 5) {
      res.status(400).json({ error: 'ValidationError', message: 'Intensity must be an integer between 1 and 5.' });
      return;
    }

    const { tracks, searchQuery, targetTags, bucket } = await generateTracks(
      currentMood, intensity, sessionDuration, musicPreferences,
    );

    const totalDuration = tracks.reduce((acc, t) => acc + t.duration, 0);

    res.status(200).json({
      sessionId: uuidv4(),
      currentMood,
      intensity,
      intensityBucket: bucket,
      desiredMood,
      sessionDuration,
      searchQuery,
      targetTags,
      tracks,
      actualDurationSeconds: totalDuration,
    });
  } catch (err: any) {
    if (err.status && err.body) {
      res.status(err.status).json(err.body);
      return;
    }
    console.error('[Wellness Controller Exception]:', err.message);
    res.status(500).json({ error: 'InternalServerError', message: 'An unexpected error occurred.' });
  }
});

apiRouter.post('/playlist', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mood_id, intensity_id, duration_minutes } = req.body;

    if (!mood_id || !intensity_id || !duration_minutes) {
      res.status(400).json({ error: 'ValidationError', message: 'Missing required fields: mood_id, intensity_id, duration_minutes.' });
      return;
    }

    const moodName = FRONTEND_TO_BACKEND_MOOD[mood_id];
    if (!moodName) {
      res.status(400).json({ error: 'ValidationError', message: `Unknown mood_id '${mood_id}'.` });
      return;
    }

    const intensityNum = FRONTEND_INTENSITY_TO_NUMBER[intensity_id];
    if (!intensityNum) {
      res.status(400).json({ error: 'ValidationError', message: `Unknown intensity_id '${intensity_id}'.` });
      return;
    }

    if (!DURATIONS.includes(duration_minutes)) {
      res.status(400).json({ error: 'ValidationError', message: `duration_minutes must be one of ${DURATIONS.join(', ')}.` });
      return;
    }

    const { tracks, searchQuery, targetTags } = await generateTracks(moodName, intensityNum, duration_minutes);

    res.status(200).json({
      session_id: uuidv4(),
      mood_id,
      intensity_id,
      duration_minutes,
      search_query: searchQuery,
      target_tags: targetTags,
      tracks: tracks.map((t) => ({
        id: t.id,
        title: t.title,
        artist: t.artist,
        duration: t.duration,
        url: t.audioUrl,
        audioUrl: t.audioUrl,
      })),
    });
  } catch (err: any) {
    if (err.status && err.body) {
      res.status(err.status).json(err.body);
      return;
    }
    console.error('[Playlist Controller Exception]:', err.message);
    res.status(500).json({ error: 'InternalServerError', message: 'An unexpected error occurred.' });
  }
});

// ── App bootstrap ──

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : true,
  credentials: true,
}));
app.use(express.json());
app.use('/api', apiRouter);

const PORT = parseInt(process.env.PORT || '8000', 10);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Soundlull Mood Wellness API running on http://localhost:${PORT}`);
  });
}

export { app, apiRouter };