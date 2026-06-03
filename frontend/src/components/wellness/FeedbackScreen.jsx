import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const OPTIONS = [
    { id: "much_better", label: "Much lighter", sub: "Noticeably calmer" },
    { id: "softer",      label: "A little softer", sub: "Edges have eased" },
    { id: "same",        label: "About the same", sub: "Still settling" },
    { id: "unsure",      label: "Not sure yet", sub: "Holding space for it" },
    { id: "heavier",     label: "Still heavy", sub: "Will return another time" },
];

export const FeedbackScreen = ({ onSubmit }) => {
    const [selected, setSelected] = useState(null);

    return (
        <section
            data-testid="feedback-screen"
            className="relative max-w-3xl mx-auto px-6 sm:px-10 py-16 md:py-24"
        >
            <motion.header
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mb-14 text-center"
            >
                <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                    A quiet check-in
                </p>
                <h2
                    className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-cream"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
                >
                    How are you{" "}
                    <span
                        className="italic text-gold"
                        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                    >
                        feeling now
                    </span>
                    ?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-creamSoft max-w-lg mx-auto leading-relaxed">
                    There is no right answer. Just notice.
                </p>
            </motion.header>

            <div className="space-y-3">
                {OPTIONS.map((opt, i) => {
                    const isSelected = selected === opt.id;
                    return (
                        <motion.button
                            key={opt.id}
                            data-testid={`feedback-option-${opt.id}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.08 * i,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            onClick={() => setSelected(opt.id)}
                            className={`w-full flex items-center justify-between rounded-2xl p-5 sm:p-6 text-left transition-all duration-500 ${
                                isSelected
                                    ? "glass-strong card-selected-glow"
                                    : "glass hover:bg-glassStrong hover:-translate-y-0.5"
                            }`}
                        >
                            <div>
                                <p
                                    className={`font-serif text-xl sm:text-2xl leading-tight ${
                                        isSelected ? "text-gold" : "text-cream"
                                    }`}
                                    style={{
                                        fontVariationSettings: '"SOFT" 70, "opsz" 144',
                                    }}
                                >
                                    {opt.label}
                                </p>
                                <p className="mt-1 text-sm text-creamSoft">
                                    {opt.sub}
                                </p>
                            </div>
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    isSelected
                                        ? "bg-gold text-night shadow-[0_0_20px_rgba(224,177,118,0.6)]"
                                        : "border border-line"
                                }`}
                            >
                                {isSelected && (
                                    <Check size={16} strokeWidth={2.5} />
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    data-testid="feedback-submit-button"
                    onClick={() => onSubmit(selected)}
                    disabled={!selected}
                    className="btn-gold group inline-flex items-center gap-3 rounded-full pl-7 pr-3 py-3 text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    Close my session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-night text-gold transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default FeedbackScreen;
