import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.06 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
            className="max-w-5xl mx-auto px-6 sm:px-10 py-14 md:py-20"
            data-testid="duration-step"
        >
            <header className="mb-12 md:mb-16 max-w-2xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-inkSoft mb-4">
                    Step three of three
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ink">
                    How long would you{" "}
                    <span className="italic text-sage">like to stay</span>?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-inkSoft max-w-lg leading-relaxed">
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
                            className={`group flex flex-col items-start rounded-3xl p-6 transition-all duration-500 border ${
                                isSelected
                                    ? "bg-ink text-canvas border-ink"
                                    : "bg-surface border-line hover:bg-surfaceHover hover:-translate-y-1"
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                                    isSelected
                                        ? "bg-canvas text-ink"
                                        : "bg-canvas text-ink"
                                }`}
                            >
                                <Clock size={16} strokeWidth={1.5} />
                            </div>
                            <p
                                className={`font-serif text-4xl sm:text-5xl mt-6 leading-none ${
                                    isSelected ? "text-canvas" : "text-ink"
                                }`}
                            >
                                {d}
                                <span className="text-xl ml-1 opacity-70">
                                    min
                                </span>
                            </p>
                            <p
                                className={`mt-3 text-sm uppercase tracking-[0.18em] ${
                                    isSelected
                                        ? "text-canvas/70"
                                        : "text-inkSoft"
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
                    className="inline-flex items-center gap-2 text-inkSoft hover:text-ink transition-colors duration-300"
                >
                    <ArrowLeft size={16} strokeWidth={1.75} />
                    Back
                </button>
                <button
                    data-testid="duration-start-button"
                    onClick={onStart}
                    disabled={!selected}
                    className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full pl-7 pr-3 py-3 text-base font-medium transition-all duration-500 hover:bg-sage hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    Start session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:translate-x-1 group-disabled:translate-x-0">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default DurationSelector;
