import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.07 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
};

export const IntensitySelector = ({
    intensities,
    selected,
    onSelect,
    onNext,
    onBack,
}) => {
    return (
        <section
            className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 md:py-20"
            data-testid="intensity-step"
        >
            <header className="mb-14 md:mb-16 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                    Step two of three · Intensity
                </p>
                <h2
                    className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-cream"
                    style={{ fontVariationSettings: '"SOFT" 50, "opsz" 144' }}
                >
                    Choose your{" "}
                    <span
                        className="italic text-gold"
                        style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                    >
                        depth
                    </span>
                    .
                </h2>
                <p className="mt-5 text-base sm:text-lg text-creamSoft max-w-lg leading-relaxed">
                    From whisper to full landscape &mdash; how much presence
                    would you like the sound to have?
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {intensities.map((item, i) => {
                    const isSelected = selected === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            data-testid={`intensity-option-${item.id}`}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            onClick={() => onSelect(item.id)}
                            className={`group relative text-left rounded-[1.5rem] p-6 transition-all duration-500 ${
                                isSelected
                                    ? "glass-strong card-selected-glow"
                                    : "glass hover:-translate-y-1.5 hover:bg-glassStrong"
                            }`}
                        >
                            <div className="flex items-end gap-1 h-14 mb-6">
                                {Array.from({ length: 5 }).map((_, idx) => {
                                    const filled = idx <= i;
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-1 rounded-sm transition-all duration-500 ${
                                                filled
                                                    ? isSelected
                                                        ? "bg-gold shadow-[0_0_12px_rgba(224,177,118,0.5)]"
                                                        : "bg-sage/80"
                                                    : "bg-line"
                                            }`}
                                            style={{
                                                height: `${24 + idx * 18}%`,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <h3
                                className={`font-serif text-2xl leading-tight ${
                                    isSelected ? "text-gold" : "text-cream"
                                }`}
                                style={{ fontVariationSettings: '"SOFT" 70, "opsz" 144' }}
                            >
                                {item.label}
                            </h3>
                            <p className="mt-2 text-sm text-creamSoft leading-relaxed">
                                {item.description}
                            </p>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-14 flex items-center justify-between">
                <button
                    data-testid="intensity-back-button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-creamSoft hover:text-cream transition-colors duration-300"
                >
                    <ArrowLeft size={16} strokeWidth={1.75} />
                    Back
                </button>
                <button
                    data-testid="intensity-next-button"
                    onClick={onNext}
                    disabled={!selected}
                    className="btn-gold group inline-flex items-center gap-3 rounded-full pl-7 pr-3 py-3 text-base font-medium disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    Continue
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-night text-gold transition-transform duration-500 group-hover:translate-x-1">
                        <ArrowRight size={16} strokeWidth={1.75} />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default IntensitySelector;
