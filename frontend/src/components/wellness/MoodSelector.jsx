import { motion } from "framer-motion";
import { moodIcons } from "../../lib/iconMap";
import { ArrowRight } from "lucide-react";

const card = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

export const MoodSelector = ({ moods, selected, onSelect, onNext }) => {
    return (
        <section
            className="max-w-5xl mx-auto px-6 sm:px-10 py-14 md:py-20"
            data-testid="mood-step"
        >
            <header className="mb-12 md:mb-16 max-w-2xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-inkSoft mb-4">
                    Step one of three
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ink">
                    How are you{" "}
                    <span className="italic text-sage">arriving</span> today?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-inkSoft max-w-lg leading-relaxed">
                    There is no wrong answer. Choose the one that feels closest
                    &mdash; we will hold the rest.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {moods.map((m, i) => {
                    const Icon = moodIcons[m.icon] || moodIcons.Feather;
                    const isSelected = selected === m.id;
                    return (
                        <motion.button
                            key={m.id}
                            data-testid={`mood-card-${m.id}`}
                            custom={i}
                            variants={card}
                            initial="hidden"
                            animate="show"
                            onClick={() => onSelect(m.id)}
                            className={`group relative text-left overflow-hidden rounded-3xl p-7 transition-all duration-500 border ${
                                isSelected
                                    ? "bg-sage-tint border-sage ring-2 ring-sage"
                                    : "bg-surface border-line hover:bg-surfaceHover hover:-translate-y-1"
                            }`}
                        >
                            <div className="flex items-start justify-between mb-10">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                                        isSelected
                                            ? "bg-ink text-canvas"
                                            : "bg-canvas text-ink"
                                    }`}
                                >
                                    <Icon size={20} strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-inkSoft">
                                    {m.subtitle}
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl sm:text-3xl text-ink leading-tight">
                                {m.label}
                            </h3>
                            <p className="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed">
                                {m.description}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-14 flex justify-end">
                <button
                    data-testid="mood-next-button"
                    onClick={onNext}
                    disabled={!selected}
                    className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full pl-7 pr-3 py-3 text-base font-medium transition-all duration-500 hover:bg-sage hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    Continue
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:translate-x-1 group-disabled:translate-x-0">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default MoodSelector;
