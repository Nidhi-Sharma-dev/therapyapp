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
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
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
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, 1900 - elapsed);
            setTimeout(() => {
                setPlaylist(res.data);
                setStep(STEPS.SESSION);
            }, remaining);
        } catch (e) {
            setError("Could not craft your session. Please try again.");
            setStep(STEPS.DURATION);
        }
    };

    const handleSessionComplete = () => setStep(STEPS.REFLECTION);
    const handleFeedback = () => setStep(STEPS.COMPLETE);

    const restart = () => {
        setMoodId(null);
        setIntensityId(null);
        setDuration(null);
        setPlaylist(null);
        setStep(STEPS.MOOD);
    };

    const exitToReflection = () => setStep(STEPS.REFLECTION);

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
        <div className="relative min-h-screen bg-night text-cream overflow-x-hidden">
            {/* Aurora backdrop (sticky to viewport) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20vw] right-[-15vw] w-[70vw] h-[70vw] rounded-full bg-sage/15 blur-3xl animate-glow-pulse" />
                <div className="absolute bottom-[-25vw] left-[-15vw] w-[75vw] h-[75vw] rounded-full bg-coral/12 blur-3xl animate-glow-pulse" style={{ animationDelay: "3s" }} />
                <div className="absolute top-[30vh] left-[20vw] w-[40vw] h-[40vw] rounded-full bg-gold/8 blur-3xl animate-glow-pulse" style={{ animationDelay: "5s" }} />
            </div>

            <NoiseOverlay />

{/*            <header className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full glass flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_14px_rgba(224,177,118,0.7)] animate-breathe" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span
                            className="font-serif text-2xl text-cream tracking-tight"
                            style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
                        >
                            Soundlull
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.32em] text-muted mt-0.5">
                            audio therapy
                        </span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-3 glass rounded-full px-5 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe" />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-creamSoft">
                        Mood · Sound · Stillness
                    </span>
                </div>
            </header>
*/}
            {showProgress && <WizardProgress currentKey={step} />}

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {step === STEPS.WELCOME && (
                        <motion.div key="welcome" {...fadeStep}>
                            <WelcomeScreen onStart={() => setStep(STEPS.MOOD)} />
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
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-strong text-cream px-5 py-3 rounded-full text-sm z-50"
                        data-testid="error-toast"
                    >
                        {error}
                    </div>
                )}
            </main>
{/*
            <footer className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-10 mt-10 border-t border-line">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                        Soundlull · a quiet companion · 2026
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
                        Made with stillness
                    </p>
                </div>
            </footer>
*/}
        </div>
    );
}
