import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    ChevronDown,
    ChevronUp,
    X,
} from "lucide-react";

const formatTime = (s) => {
    if (!s || Number.isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${sec}`;
};

export const AudioPlayer = ({
    tracks,
    sessionMeta,
    onSessionComplete,
    onExit,
}) => {
    const audioRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [muted, setMuted] = useState(false);
    const [queueOpen, setQueueOpen] = useState(true);

    const current = tracks[index];

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        a.src = current.url;
        a.load();
        if (isPlaying) {
            a.play().catch(() => setIsPlaying(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        a.volume = muted ? 0 : volume;
    }, [volume, muted]);

    const onTimeUpdate = () => {
        const a = audioRef.current;
        if (!a) return;
        setProgress(a.currentTime);
        setDuration(a.duration || 0);
    };

    const togglePlay = () => {
        const a = audioRef.current;
        if (!a) return;
        if (isPlaying) {
            a.pause();
            setIsPlaying(false);
        } else {
            a.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const handleEnded = () => {
        if (index < tracks.length - 1) setIndex(index + 1);
        else {
            setIsPlaying(false);
            onSessionComplete();
        }
    };

    const next = () => {
        if (index < tracks.length - 1) setIndex(index + 1);
        else onSessionComplete();
    };
    const prev = () => {
        if (index > 0) setIndex(index - 1);
        else {
            const a = audioRef.current;
            if (a) a.currentTime = 0;
        }
    };

    const seek = (e) => {
        const a = audioRef.current;
        if (!a || !duration) return;
        const val = Number(e.target.value);
        a.currentTime = (val / 100) * duration;
        setProgress(a.currentTime);
    };

    const percent = duration ? (progress / duration) * 100 : 0;

    return (
        <section
            className="relative max-w-6xl mx-auto px-6 sm:px-10 py-12 md:py-16"
            data-testid="audio-player-screen"
        >
            <div className="flex items-center justify-between mb-10">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-gold">
                        Now holding you
                    </p>
                    <h2
                        className="font-serif text-3xl sm:text-4xl text-cream mt-2"
                        style={{ fontVariationSettings: '"SOFT" 70, "opsz" 144' }}
                    >
                        {sessionMeta.moodLabel}{" "}
                        <span
                            className="italic text-gold"
                            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                        >
                            · {sessionMeta.intensityLabel}
                        </span>
                    </h2>
                </div>
                <button
                    data-testid="player-exit-button"
                    onClick={onExit}
                    className="btn-outline inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
                    aria-label="End session"
                >
                    <X size={16} strokeWidth={1.5} />
                    <span className="hidden sm:inline">End session</span>
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                    <div className="relative glass-strong rounded-[2rem] p-8 sm:p-12 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-sage/8 pointer-events-none" />

                        <div className="relative h-72 sm:h-80 flex items-center justify-center mb-8">
                            <div
                                className={`absolute w-80 h-80 rounded-full bg-sage/30 blur-3xl ${
                                    isPlaying ? "animate-breathe-slow" : "opacity-30"
                                }`}
                            />
                            <div
                                className={`absolute w-60 h-60 rounded-full bg-gold/40 blur-3xl ${
                                    isPlaying ? "animate-breathe" : "opacity-40"
                                }`}
                            />
                            <div
                                className={`absolute w-40 h-40 rounded-full bg-coral/30 blur-2xl ${
                                    isPlaying ? "animate-float-y" : "opacity-30"
                                }`}
                            />
                            <div className="relative w-44 h-44 rounded-full glass-strong flex items-center justify-center">
                                {isPlaying ? (
                                    <div className="flex items-end">
                                        {[0, 0.15, 0.3, 0.45, 0.6].map((d) => (
                                            <span
                                                key={d}
                                                className="wave-bar"
                                                style={{ animationDelay: `${d}s` }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-3 h-3 rounded-full bg-gold/80" />
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-3">
                                        Track {index + 1} of {tracks.length}
                                    </p>
                                    <h3
                                        data-testid="current-track-title"
                                        className="font-serif text-3xl sm:text-4xl text-cream leading-tight"
                                        style={{
                                            fontVariationSettings: '"SOFT" 80, "opsz" 144',
                                        }}
                                    >
                                        {current.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-creamSoft">
                                        {current.artist}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="mt-8">
                            <input
                                data-testid="progress-slider"
                                type="range"
                                min={0}
                                max={100}
                                value={percent || 0}
                                onChange={seek}
                                className="sl-range w-full"
                                style={{
                                    background: `linear-gradient(to right, #E0B176 0%, #E0B176 ${percent}%, rgba(236,231,217,0.12) ${percent}%, rgba(236,231,217,0.12) 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-xs text-muted mt-2 tnum">
                                <span>{formatTime(progress)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-6">
                            <button
                                data-testid="prev-track-button"
                                onClick={prev}
                                className="w-12 h-12 rounded-full glass text-cream flex items-center justify-center hover:bg-glassStrong hover:scale-105 active:scale-95 transition-all duration-300"
                                aria-label="Previous track"
                            >
                                <SkipBack size={18} strokeWidth={1.75} />
                            </button>
                            <button
                                data-testid="play-pause-button"
                                onClick={togglePlay}
                                className="btn-gold w-[68px] h-[68px] rounded-full flex items-center justify-center"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause size={24} strokeWidth={1.75} />
                                ) : (
                                    <Play
                                        size={24}
                                        strokeWidth={1.75}
                                        className="ml-1"
                                    />
                                )}
                            </button>
                            <button
                                data-testid="next-track-button"
                                onClick={next}
                                className="w-12 h-12 rounded-full glass text-cream flex items-center justify-center hover:bg-glassStrong hover:scale-105 active:scale-95 transition-all duration-300"
                                aria-label="Next track"
                            >
                                <SkipForward size={18} strokeWidth={1.75} />
                            </button>
                        </div>

                        <div className="mt-8 flex items-center gap-3 max-w-xs mx-auto">
                            <button
                                data-testid="mute-toggle-button"
                                onClick={() => setMuted((v) => !v)}
                                className="text-creamSoft hover:text-gold transition-colors"
                                aria-label="Toggle mute"
                            >
                                {muted || volume === 0 ? (
                                    <VolumeX size={16} strokeWidth={1.75} />
                                ) : (
                                    <Volume2 size={16} strokeWidth={1.75} />
                                )}
                            </button>
                            <input
                                data-testid="volume-slider"
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={muted ? 0 : volume}
                                onChange={(e) => {
                                    setVolume(Number(e.target.value));
                                    setMuted(false);
                                }}
                                className="sl-range flex-1"
                            />
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-5 space-y-6">
                    <div className="glass rounded-[2rem] p-6 sm:p-7">
                        <button
                            data-testid="queue-toggle-button"
                            onClick={() => setQueueOpen((v) => !v)}
                            className="w-full flex items-center justify-between text-left mb-5"
                        >
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.32em] text-gold">
                                    Coming up
                                </p>
                                <h4
                                    className="font-serif text-2xl text-cream mt-1.5"
                                    style={{
                                        fontVariationSettings: '"SOFT" 60, "opsz" 144',
                                    }}
                                >
                                    Session queue
                                </h4>
                            </div>
                            <span className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-cream">
                                {queueOpen ? (
                                    <ChevronUp size={16} strokeWidth={1.75} />
                                ) : (
                                    <ChevronDown size={16} strokeWidth={1.75} />
                                )}
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {queueOpen && (
                                <motion.ul
                                    data-testid="queue-list"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="overflow-hidden sl-scroll max-h-[360px] overflow-y-auto"
                                >
                                    {tracks.map((t, i) => {
                                        const isCurrent = i === index;
                                        return (
                                            <li
                                                key={t.id}
                                                data-testid={`queue-item-${i}`}
                                            >
                                                <button
                                                    onClick={() => setIndex(i)}
                                                    className={`w-full flex items-center gap-4 py-3.5 px-3 rounded-xl border-b border-lineSoft last:border-b-0 text-left transition-all duration-300 hover:bg-glass ${
                                                        isCurrent
                                                            ? "bg-glassStrong"
                                                            : ""
                                                    }`}
                                                >
                                                    <span
                                                        className={`font-serif text-xl tnum ${
                                                            isCurrent
                                                                ? "text-gold"
                                                                : "text-muted"
                                                        }`}
                                                        style={{
                                                            fontVariationSettings:
                                                                '"SOFT" 80, "opsz" 144',
                                                        }}
                                                    >
                                                        {(i + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                    </span>
                                                    <span className="flex-1 min-w-0">
                                                        <span
                                                            className={`block truncate text-sm ${
                                                                isCurrent
                                                                    ? "text-cream font-medium"
                                                                    : "text-cream"
                                                            }`}
                                                        >
                                                            {t.title}
                                                        </span>
                                                        <span className="block text-xs text-muted truncate mt-0.5">
                                                            {t.artist}
                                                        </span>
                                                    </span>
                                                    {isCurrent && isPlaying && (
                                                        <div className="flex items-end gap-[2px]">
                                                            <span className="wave-bar" />
                                                            <span
                                                                className="wave-bar"
                                                                style={{
                                                                    animationDelay:
                                                                        "0.2s",
                                                                }}
                                                            />
                                                            <span
                                                                className="wave-bar"
                                                                style={{
                                                                    animationDelay:
                                                                        "0.4s",
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="glass rounded-[2rem] p-6 sm:p-7">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                            This session
                        </p>
                        <dl className="grid grid-cols-2 gap-y-4 gap-x-2">
                            <dt className="text-sm text-muted">Mood</dt>
                            <dd className="text-sm text-cream text-right">
                                {sessionMeta.moodLabel}
                            </dd>
                            <dt className="text-sm text-muted">Intensity</dt>
                            <dd className="text-sm text-cream text-right">
                                {sessionMeta.intensityLabel}
                            </dd>
                            <dt className="text-sm text-muted">Duration</dt>
                            <dd className="text-sm text-cream text-right">
                                {sessionMeta.duration} minutes
                            </dd>
                        </dl>
                    </div>
                </aside>
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onTimeUpdate}
                onEnded={handleEnded}
                preload="metadata"
            />
        </section>
    );
};

export default AudioPlayer;
