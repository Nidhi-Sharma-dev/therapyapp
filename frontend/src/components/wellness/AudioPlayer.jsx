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
    const [queueOpen, setQueueOpen] = useState(false);

    const current = tracks[index];

    // Reset progress when track changes; autoplay if already playing
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
        if (index < tracks.length - 1) {
            setIndex(index + 1);
        } else {
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
            className="max-w-5xl mx-auto px-6 sm:px-10 py-12 md:py-16"
            data-testid="audio-player-screen"
        >
            {/* Top meta */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-inkSoft">
                        Now holding you
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink mt-2">
                        {sessionMeta.moodLabel}{" "}
                        <span className="italic text-sage">
                            · {sessionMeta.intensityLabel}
                        </span>
                    </h2>
                </div>
                <button
                    data-testid="player-exit-button"
                    onClick={onExit}
                    className="inline-flex items-center gap-2 text-inkSoft hover:text-ink transition-colors duration-300"
                    aria-label="End session"
                >
                    <X size={18} strokeWidth={1.5} />
                    <span className="hidden sm:inline text-sm">End session</span>
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Visualizer + controls */}
                <div className="lg:col-span-7">
                    <div className="relative bg-surface border border-line rounded-3xl p-8 sm:p-12 overflow-hidden">
                        {/* Breathing visualizer */}
                        <div className="relative h-72 sm:h-80 flex items-center justify-center mb-8">
                            <div
                                className={`absolute w-72 h-72 rounded-full bg-sage/30 blur-3xl ${
                                    isPlaying ? "animate-breathe-slow" : ""
                                }`}
                            />
                            <div
                                className={`absolute w-56 h-56 rounded-full bg-rose/40 blur-2xl ${
                                    isPlaying ? "animate-breathe" : ""
                                }`}
                            />
                            <div
                                className={`absolute w-40 h-40 rounded-full bg-sand blur-xl ${
                                    isPlaying ? "animate-float-y" : ""
                                }`}
                            />
                            <div className="relative w-40 h-40 rounded-full border border-line bg-canvas/70 backdrop-blur-xl flex items-center justify-center">
                                {isPlaying ? (
                                    <div className="flex items-end">
                                        <span
                                            className="wave-bar"
                                            style={{ animationDelay: "0s" }}
                                        />
                                        <span
                                            className="wave-bar"
                                            style={{ animationDelay: "0.15s" }}
                                        />
                                        <span
                                            className="wave-bar"
                                            style={{ animationDelay: "0.3s" }}
                                        />
                                        <span
                                            className="wave-bar"
                                            style={{ animationDelay: "0.45s" }}
                                        />
                                        <span
                                            className="wave-bar"
                                            style={{ animationDelay: "0.6s" }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-3 h-3 rounded-full bg-ink/70" />
                                )}
                            </div>
                        </div>

                        {/* Now-playing meta */}
                        <div className="text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="text-xs uppercase tracking-[0.28em] text-inkSoft mb-3">
                                        Track {index + 1} of {tracks.length}
                                    </p>
                                    <h3
                                        data-testid="current-track-title"
                                        className="font-serif text-3xl sm:text-4xl text-ink leading-tight"
                                    >
                                        {current.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-inkSoft">
                                        {current.artist}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Progress bar */}
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
                                    background: `linear-gradient(to right, #2A3229 0%, #2A3229 ${percent}%, #E3E1DB ${percent}%, #E3E1DB 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-xs text-inkSoft mt-2 tabular-nums">
                                <span>{formatTime(progress)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-8 flex items-center justify-center gap-6">
                            <button
                                data-testid="prev-track-button"
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-line text-ink flex items-center justify-center hover:bg-canvas hover:scale-105 active:scale-95 transition-all duration-300"
                                aria-label="Previous track"
                            >
                                <SkipBack size={18} strokeWidth={1.75} />
                            </button>
                            <button
                                data-testid="play-pause-button"
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-ink text-canvas flex items-center justify-center hover:bg-sage transition-all duration-300 hover:scale-105 active:scale-95"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause size={22} strokeWidth={1.75} />
                                ) : (
                                    <Play
                                        size={22}
                                        strokeWidth={1.75}
                                        className="ml-1"
                                    />
                                )}
                            </button>
                            <button
                                data-testid="next-track-button"
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-line text-ink flex items-center justify-center hover:bg-canvas hover:scale-105 active:scale-95 transition-all duration-300"
                                aria-label="Next track"
                            >
                                <SkipForward size={18} strokeWidth={1.75} />
                            </button>
                        </div>

                        {/* Volume */}
                        <div className="mt-8 flex items-center gap-3 max-w-xs mx-auto">
                            <button
                                data-testid="mute-toggle-button"
                                onClick={() => setMuted((v) => !v)}
                                className="text-inkSoft hover:text-ink transition-colors"
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

                {/* Queue */}
                <aside className="lg:col-span-5">
                    <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8">
                        <button
                            data-testid="queue-toggle-button"
                            onClick={() => setQueueOpen((v) => !v)}
                            className="w-full flex items-center justify-between text-left mb-4"
                        >
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-inkSoft">
                                    Coming up
                                </p>
                                <h4 className="font-serif text-2xl text-ink mt-1">
                                    Your session queue
                                </h4>
                            </div>
                            <span className="w-10 h-10 rounded-full bg-canvas border border-line flex items-center justify-center text-ink">
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
                                                    className={`w-full flex items-center gap-4 py-4 border-b border-line/60 last:border-b-0 text-left transition-colors duration-300 hover:bg-canvas rounded-xl px-3 ${
                                                        isCurrent
                                                            ? "bg-canvas"
                                                            : ""
                                                    }`}
                                                >
                                                    <span
                                                        className={`font-serif text-2xl tabular-nums ${
                                                            isCurrent
                                                                ? "text-ink"
                                                                : "text-inkSoft/60"
                                                        }`}
                                                    >
                                                        {(i + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                    </span>
                                                    <span className="flex-1 min-w-0">
                                                        <span
                                                            className={`block truncate ${
                                                                isCurrent
                                                                    ? "text-ink font-medium"
                                                                    : "text-ink"
                                                            }`}
                                                        >
                                                            {t.title}
                                                        </span>
                                                        <span className="block text-xs text-inkSoft truncate mt-0.5">
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

                        {!queueOpen && (
                            <p className="text-sm text-inkSoft leading-relaxed">
                                {tracks.length} tracks gathered for your{" "}
                                {sessionMeta.duration}-minute session. Open to
                                see what is coming.
                            </p>
                        )}
                    </div>

                    {/* Session card */}
                    <div className="mt-6 bg-canvas border border-line rounded-3xl p-6 sm:p-8">
                        <p className="text-xs uppercase tracking-[0.28em] text-inkSoft mb-4">
                            This session
                        </p>
                        <dl className="grid grid-cols-2 gap-y-4 gap-x-2">
                            <dt className="text-sm text-inkSoft">Mood</dt>
                            <dd className="text-sm text-ink text-right">
                                {sessionMeta.moodLabel}
                            </dd>
                            <dt className="text-sm text-inkSoft">Intensity</dt>
                            <dd className="text-sm text-ink text-right">
                                {sessionMeta.intensityLabel}
                            </dd>
                            <dt className="text-sm text-inkSoft">Duration</dt>
                            <dd className="text-sm text-ink text-right">
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
