import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.07 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
};

const LABELS = {
    5: "A breath",
    10: "A pause",
    15: "A reset",
    20: "A deep dip",
    30: "A full unwind",
};

export const DurationSelector = ({
    durations,
    selected,
    onSelect,
    onStart,
    onBack,
}) => {
    return (
        <section
            className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 md:py-20"
            data-testid="duration-step"
        >
            <header className="mb-14 md:mb-16 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                    Step three of three · Duration
                </p>
                <h2
                    className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-cream"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
                >
                    How long would you{" "}
                    <span
                        className="italic text-gold"
                        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                    >
                        like to stay
                    </span>
                    ?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-creamSoft max-w-lg leading-relaxed">
                    Even a small amount of time is enough.
                </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {durations.map((d, i) => {
                    const isSelected = selected === d;
                    return (
                        <motion.button
                            key={d}
                            data-testid={`duration-option-${d}`}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            onClick={() => onSelect(d)}
                            className={`group relative flex flex-col items-start rounded-[1.5rem] p-6 transition-all duration-500 ${
                                isSelected
                                    ? "glass-strong card-selected-glow"
                                    : "glass hover:-translate-y-1.5 hover:bg-glassStrong"
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                                    isSelected
                                        ? "bg-gold text-night"
                                        : "bg-night/40 text-cream border border-line"
                                }`}
                            >
                                <Clock size={16} strokeWidth={1.5} />
                            </div>
                            <p
                                className={`font-serif mt-6 leading-none text-[clamp(2.5rem,4vw,3.5rem)] ${
                                    isSelected ? "text-gold" : "text-cream"
                                }`}
                                style={{ fontVariationSettings: '"SOFT" 80, "opsz" 144' }}
                            >
                                {d}
                                <span className="text-base font-sans ml-1.5 opacity-60 uppercase tracking-widest align-top">
                                    min
                                </span>
                            </p>
                            <p
                                className={`mt-4 text-xs uppercase tracking-[0.22em] ${
                                    isSelected ? "text-gold/80" : "text-muted"
                                }`}
                            >
                                {LABELS[d]}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-14 flex items-center justify-between">
                <button
                    data-testid="duration-back-button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-creamSoft hover:text-cream transition-colors duration-300"
                >
                    <ArrowLeft size={16} strokeWidth={1.75} />
                    Back
                </button>
                <button
                    data-testid="duration-start-button"
                    onClick={onStart}
                    disabled={!selected}
                    className="btn-gold group inline-flex items-center gap-3 rounded-full pl-7 pr-3 py-3 text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    Begin session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-night text-gold transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default DurationSelector;
