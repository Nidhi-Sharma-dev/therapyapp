import { motion } from "framer-motion";
import { moodIcons } from "../../lib/iconMap";
import { ArrowRight, Check } from "lucide-react";

const card = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.07 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
};

const MOOD_IMAGES = {
    stressed:
        "https://images.pexels.com/photos/7418090/pexels-photo-7418090.jpeg?auto=compress&cs=tinysrgb&w=900",
    unfocused:
        "https://images.pexels.com/photos/1437493/pexels-photo-1437493.jpeg?auto=compress&cs=tinysrgb&w=900",
    low_energy:
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=900",
    anxious:
        "https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=900",
    restless:
        "https://images.pexels.com/photos/3934645/pexels-photo-3934645.jpeg?auto=compress&cs=tinysrgb&w=900",
};

export const MoodSelector = ({ moods, selected, onSelect, onNext }) => {
    return (
        <section
            className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 md:py-20"
            data-testid="mood-step"
        >
            <header className="mb-14 md:mb-16 max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                    Step one of three · Mood
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
                        arriving
                    </span>{" "}
                    today?
                </h2>
                <p className="mt-5 text-base sm:text-lg text-creamSoft max-w-lg leading-relaxed">
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
                            className={`group relative text-left overflow-hidden rounded-[1.75rem] transition-all duration-500 ${
                                isSelected
                                    ? "card-selected-glow"
                                    : "hover:-translate-y-1.5"
                            }`}
                        >
                            {/* Image backdrop */}
                            <div className="relative h-72 sm:h-80 overflow-hidden">
                                <img
                                    src={MOOD_IMAGES[m.id]}
                                    alt=""
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                                        isSelected
                                            ? "scale-105 opacity-90"
                                            : "opacity-70 group-hover:scale-105 group-hover:opacity-90"
                                    }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/20" />
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-night/40" />

                                {/* Top row */}
                                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                                    <div
                                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-500 backdrop-blur-md ${
                                            isSelected
                                                ? "bg-gold text-night"
                                                : "bg-night/60 text-cream border border-line"
                                        }`}
                                    >
                                        <Icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.28em] text-creamSoft/80 mt-3">
                                        {m.subtitle}
                                    </span>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                                    <h3
                                        className="font-serif text-3xl sm:text-[2rem] text-cream leading-tight"
                                        style={{
                                            fontVariationSettings: '"SOFT" 80, "opsz" 144',
                                        }}
                                    >
                                        {m.label}
                                    </h3>
                                    <p className="mt-2 text-sm text-creamSoft leading-relaxed max-w-xs">
                                        {m.description}
                                    </p>
                                </div>

                                {/* Selected check */}
                                {isSelected && (
                                    <div className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-gold text-night flex items-center justify-center shadow-[0_0_24px_rgba(224,177,118,0.6)]">
                                        <Check size={16} strokeWidth={2.5} />
                                    </div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-14 flex items-center justify-between">
                <p className="text-sm text-muted">
                    {selected ? "Beautiful. Continue when ready." : "Select one to continue"}
                </p>
                <button
                    data-testid="mood-next-button"
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

export default MoodSelector;
