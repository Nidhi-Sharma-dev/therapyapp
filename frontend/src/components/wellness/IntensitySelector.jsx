import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.06 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
            className="max-w-5xl mx-auto px-6 sm:px-10 py-14 md:py-20"
            data-testid="intensity-step"
        >
            <header className="mb-12 md:mb-16 max-w-2xl">
                <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-inkSoft mb-4">
                    Step two of three
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ink">
                    Choose your{" "}
                    <span className="italic text-sage">intensity</span>.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-inkSoft max-w-lg leading-relaxed">
                    From a soft hush to a full landscape &mdash; how much
                    presence would you like the sound to have?
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
                            className={`group relative text-left rounded-3xl p-6 transition-all duration-500 border ${
                                isSelected
                                    ? "bg-sage-tint border-sage ring-2 ring-sage"
                                    : "bg-surface border-line hover:bg-surfaceHover hover:-translate-y-1"
                            }`}
                        >
                            {/* Intensity meter */}
                            <div className="flex items-end gap-1 h-12 mb-5">
                                {Array.from({ length: 5 }).map((_, idx) => {
                                    const filled = idx <= i;
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex-1 rounded-sm transition-all duration-500 ${
                                                filled
                                                    ? isSelected
                                                        ? "bg-ink"
                                                        : "bg-sage"
                                                    : "bg-line"
                                            }`}
                                            style={{
                                                height: `${20 + idx * 18}%`,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <h3 className="font-serif text-2xl text-ink leading-tight">
                                {item.label}
                            </h3>
                            <p className="mt-2 text-sm text-inkSoft leading-relaxed">
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
                    className="inline-flex items-center gap-2 text-inkSoft hover:text-ink transition-colors duration-300"
                >
                    <ArrowLeft size={16} strokeWidth={1.75} />
                    Back
                </button>
                <button
                    data-testid="intensity-next-button"
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

export default IntensitySelector;
