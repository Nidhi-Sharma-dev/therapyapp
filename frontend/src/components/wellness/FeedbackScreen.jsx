import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
            className="max-w-3xl mx-auto px-6 sm:px-10 py-16 md:py-24"
        >
            <motion.header
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 md:mb-16 text-center"
            >
                <p className="text-xs uppercase tracking-[0.32em] text-inkSoft mb-4">
                    A quiet check-in
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ink">
                    How are you{" "}
                    <span className="italic text-sage">feeling now</span>?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-inkSoft max-w-lg mx-auto leading-relaxed">
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
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.08 * i,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            onClick={() => setSelected(opt.id)}
                            className={`w-full flex items-center justify-between rounded-3xl border p-5 sm:p-6 text-left transition-all duration-500 ${
                                isSelected
                                    ? "bg-ink text-canvas border-ink"
                                    : "bg-surface border-line hover:bg-surfaceHover hover:-translate-y-0.5"
                            }`}
                        >
                            <div>
                                <p
                                    className={`font-serif text-xl sm:text-2xl leading-tight ${
                                        isSelected ? "text-canvas" : "text-ink"
                                    }`}
                                >
                                    {opt.label}
                                </p>
                                <p
                                    className={`mt-1 text-sm ${
                                        isSelected
                                            ? "text-canvas/70"
                                            : "text-inkSoft"
                                    }`}
                                >
                                    {opt.sub}
                                </p>
                            </div>
                            <div
                                className={`w-5 h-5 rounded-full border transition-all duration-500 ${
                                    isSelected
                                        ? "bg-canvas border-canvas"
                                        : "border-line"
                                }`}
                            />
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    data-testid="feedback-submit-button"
                    onClick={() => onSubmit(selected)}
                    disabled={!selected}
                    className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full pl-7 pr-3 py-3 text-base font-medium transition-all duration-500 hover:bg-sage hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    Close my session
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:translate-x-1 group-disabled:translate-x-0">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default FeedbackScreen;
