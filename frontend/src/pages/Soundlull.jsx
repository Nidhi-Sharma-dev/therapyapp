import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import NoiseOverlay from "../components/wellness/NoiseOverlay";
import WelcomeScreen from "../components/wellness/WelcomeScreen";
import MoodSelector from "../components/wellness/MoodSelector";
import IntensitySelector from "../components/wellness/IntensitySelector";
import DurationSelector from "../components/wellness/DurationSelector";
import LoadingScreen from "../components/wellness/LoadingScreen";
import AudioPlayer from "../components/wellness/AudioPlayer";
import FeedbackScreen from "../components/wellness/FeedbackScreen";
import CompletionScreen from "../components/wellness/CompletionScreen";
import WizardProgress from "../components/wellness/WizardProgress";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const STEPS = {
    WELCOME: "welcome",
    MOOD: "mood",
    INTENSITY: "intensity",
    DURATION: "duration",
    LOADING: "loading",
    SESSION: "session",
    REFLECTION: "reflection",
    COMPLETE: "complete",
};

const fadeStep = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Soundlull() {
    const [step, setStep] = useState(STEPS.WELCOME);
    const [catalog, setCatalog] = useState(null);
    const [moodId, setMoodId] = useState(null);
    const [intensityId, setIntensityId] = useState(null);
    const [duration, setDuration] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`${API}/catalog`);
                setCatalog(res.data);
            } catch (e) {
                setError("Could not reach the calm. Please try again.");
            }
        };
        load();
    }, []);

    const startSession = async () => {
        setStep(STEPS.LOADING);
        const startedAt = Date.now();
        try {
            const res = await axios.post(`${API}/playlist`, {
                mood_id: moodId,
                intensity_id: intensityId,
                duration_minutes: duration,
            });
            // Hold the calming loading state for a beat (min 1.8s)
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, 1800 - elapsed);
            setTimeout(() => {
                setPlaylist(res.data);
                setStep(STEPS.SESSION);
            }, remaining);
        } catch (e) {
            setError("Could not craft your session. Please try again.");
            setStep(STEPS.DURATION);
        }
    };

    const handleSessionComplete = () => {
        setStep(STEPS.REFLECTION);
    };

    const handleFeedback = () => {
        setStep(STEPS.COMPLETE);
    };

    const restart = () => {
        setMoodId(null);
        setIntensityId(null);
        setDuration(null);
        setPlaylist(null);
        setStep(STEPS.MOOD);
    };

    const exitToReflection = () => {
        setStep(STEPS.REFLECTION);
    };

    const showProgress = [
        STEPS.MOOD,
        STEPS.INTENSITY,
        STEPS.DURATION,
        STEPS.SESSION,
        STEPS.REFLECTION,
    ].includes(step);

    const moodObj = catalog?.moods.find((m) => m.id === moodId);
    const intensityObj = catalog?.intensities.find((i) => i.id === intensityId);

    return (
        <div className="relative min-h-screen bg-canvas text-ink overflow-x-hidden">
            <NoiseOverlay />

            {/* Ambient background blobs */}
            <div className="pointer-events-none absolute top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-rose/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-160px] left-[-160px] w-[480px] h-[480px] rounded-full bg-sage/20 blur-3xl" />

            <header className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-line bg-canvas flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-ink animate-breathe" />
                    </div>
                    <span className="font-serif text-2xl text-ink tracking-tight">
                        Soundlull
                    </span>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-[0.28em] text-inkSoft">
                    <span>Mood</span>
                    <span>·</span>
                    <span>Sound</span>
                    <span>·</span>
                    <span>Stillness</span>
                </div>
            </header>

            {showProgress && <WizardProgress currentKey={step} />}

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {step === STEPS.WELCOME && (
                        <motion.div key="welcome" {...fadeStep}>
                            <WelcomeScreen
                                onStart={() => setStep(STEPS.MOOD)}
                            />
                        </motion.div>
                    )}

                    {step === STEPS.MOOD && catalog && (
                        <motion.div key="mood" {...fadeStep}>
                            <MoodSelector
                                moods={catalog.moods}
                                selected={moodId}
                                onSelect={setMoodId}
                                onNext={() => setStep(STEPS.INTENSITY)}
                            />
                        </motion.div>
                    )}

                    {step === STEPS.INTENSITY && catalog && (
                        <motion.div key="intensity" {...fadeStep}>
                            <IntensitySelector
                                intensities={catalog.intensities}
                                selected={intensityId}
                                onSelect={setIntensityId}
                                onNext={() => setStep(STEPS.DURATION)}
                                onBack={() => setStep(STEPS.MOOD)}
                            />
                        </motion.div>
                    )}

                    {step === STEPS.DURATION && catalog && (
                        <motion.div key="duration" {...fadeStep}>
                            <DurationSelector
                                durations={catalog.durations}
                                selected={duration}
                                onSelect={setDuration}
                                onStart={startSession}
                                onBack={() => setStep(STEPS.INTENSITY)}
                            />
                        </motion.div>
                    )}

                    {step === STEPS.LOADING && (
                        <motion.div key="loading" {...fadeStep}>
                            <LoadingScreen />
                        </motion.div>
                    )}

                    {step === STEPS.SESSION && playlist && (
                        <motion.div key="session" {...fadeStep}>
                            <AudioPlayer
                                tracks={playlist.tracks}
                                sessionMeta={{
                                    moodLabel: moodObj?.label || "",
                                    intensityLabel: intensityObj?.label || "",
                                    duration,
                                }}
                                onSessionComplete={handleSessionComplete}
                                onExit={exitToReflection}
                            />
                        </motion.div>
                    )}

                    {step === STEPS.REFLECTION && (
                        <motion.div key="reflection" {...fadeStep}>
                            <FeedbackScreen onSubmit={handleFeedback} />
                        </motion.div>
                    )}

                    {step === STEPS.COMPLETE && (
                        <motion.div key="complete" {...fadeStep}>
                            <CompletionScreen onRestart={restart} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink text-canvas px-5 py-3 rounded-full text-sm z-50"
                        data-testid="error-toast"
                    >
                        {error}
                    </div>
                )}
            </main>

            <footer className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-10 mt-10 border-t border-line">
                <p className="text-xs uppercase tracking-[0.28em] text-inkSoft text-center">
                    Soundlull · a quiet companion · 2026
                </p>
            </footer>
        </div>
    );
}
